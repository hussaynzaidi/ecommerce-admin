"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash2, Variable } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget, CloudinaryUploadWidgetInfo} from 'next-cloudinary'

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setMounted] = useState(false);

  const ref = useRef<any>()

  useEffect(() =>{
    ref.current= onChange
  })

  useEffect(() => {
    setMounted(true);
  }, []);

  // const onUpload = (result: any) => {
  //   onChange(result.info.secure_url);
  //   console.log('url sent:' + result.info.secure_url);
  // };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 items-center flex gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="w-[200px] rounded-md overflow-hidden h-[200px] relative"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src= {url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={(results) =>{
        if(results.info)
        {
          const info = results.info as CloudinaryUploadWidgetInfo
          ref.current(info.secure_url)
        }
      }} uploadPreset="rqu1wg1p">
        {({open }) => {
            const onClick = () => {
                open()
            }
            return (
                <Button
                type="button"
                disabled={disabled}
                variant={'secondary'}
                onClick={onClick}>
                    <ImagePlus className="h-4 w-4 mr-2"/>
                    Upload an image
                </Button>
            )
        }}
      </CldUploadWidget>
    </div>
  );
};
//