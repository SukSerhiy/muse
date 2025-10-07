/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from 'react-image-crop';

import { setCanvasPreview } from './setCanvasPreview';

type ImageCropperProps = {
  updateAvatar: (dataUrl: string) => void;
  closeModal?: () => void;
};

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper: FC<ImageCropperProps> = ({ updateAvatar, closeModal }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      const imageElement = new Image();
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (e: Event) => {
        if (error) setError('');
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION && naturalHeight < MIN_DIMENSION) {
          setError('Image must be 150 x 150 pixels.');
          return setImgSrc('');
        }
      });
      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const cropHeightInPercent = (MIN_DIMENSION / height) * 100;

    const crop = makeAspectCrop(
      { unit: '%', width: cropWidthInPercent, height: cropHeightInPercent },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="mb-3 block w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-700 file:px-2 file:py-1 file:text-xs file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            aspect={ASPECT_RATIO}
          >
            <img ref={imgRef} src={imgSrc} alt="upload" onLoad={onImageLoad} />
          </ReactCrop>
          <button
            className="mt-4 rounded-2xl bg-sky-500 px-4 py-2 font-mono text-xs text-white hover:bg-sky-600"
            onClick={() => {
              if (!crop || !imgRef.current || !previewCanvasRef.current) return;
              debugger;
              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();

              updateAvatar(dataUrl);
              closeModal?.();
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
