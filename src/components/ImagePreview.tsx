import React from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  title: string;
}

const ImagePreview = ({ src, alt, title }: ImagePreviewProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg"
      />
    </div>
  );
};

export default ImagePreview;