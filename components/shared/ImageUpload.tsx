import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageUpload: React.FC<ImageUploadProps> = ({
  form,
  image,
  onChange,
  onDelete,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 mt-[45px]">
      <div>
        <Label
          htmlFor="image"
          className="text-sm text-[#343A40] font-medium border-none mb-2"
        >
          ავატარი*
        </Label>

        <Label
          className={`w-full flex justify-center items-center h-[120px] border border-dashed ${
            form.formState.errors.avatar ? "border-red-500" : "border-[#CED4DA]"
          }  rounded-lg cursor-pointer`}
          htmlFor="avatar"
        >
          {image ? (
            <div className="relative w-max">
              <Image
                src={image}
                alt="avatar logo"
                width={88}
                height={88}
                className="rounded-full object-cover w-[88px] h-[88px]"
              />
              <button
                type="button"
                onClick={onDelete}
                className="absolute right-0 bottom-0 rounded-full p-[5px] bg-white border border-[#6C757D] text-sm text-[#6C757D] cursor-pointer"
              >
                <Image
                  src="/assets/delete-icon.png"
                  alt="delete"
                  width={14}
                  height={14}
                  className="w-[14px] h-[14px] object-contain"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-[7px] items-center">
              <Image
                src="/assets/upload.png"
                alt="upload"
                width={24}
                height={24}
              />
              <p className="text-[#343A40] text-sm">ატვირთეთ ფოტო</p>
            </div>
          )}
        </Label>
        <Input
          type="file"
          accept="image/*"
          id="avatar"
          className="border hidden"
          {...form.register("avatar")}
          onChange={(e) => onChange("image", e)}
        />
      </div>

      {form.formState.errors.avatar && (
        <p className="text-[#FA4D4D] text-sm h-[25px]">
          {form.formState.errors.avatar.message}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
