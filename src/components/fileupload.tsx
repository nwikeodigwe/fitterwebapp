import clsx from "clsx";
import {
  useRef,
  useState,
  useEffect,
  type InputHTMLAttributes,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { CiImageOn } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

export interface FileUploadProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "type" | "onChange"
  > {
  value?: File[];
  onChange: (files: File[]) => void;
  error?: string;
}
const FileUpload = ({
  value = [],
  onChange,
  error,
  ...props
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const urls = value.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => {
      prev.forEach(URL.revokeObjectURL);
      return urls;
    });
  }, [value]);
  useEffect(() => {
    return () => previewUrls.forEach(URL.revokeObjectURL);
  }, [previewUrls]);

  const openPicker = () => inputRef.current?.click();

  const addFiles = (newFiles: File[]) => {
    const combined = [...value, ...newFiles].slice(0, 3);
    onChange(combined);
  };

  const removeImage = (idx: number) => {
    const newFiles = value.filter((_, i) => i !== idx);
    onChange(newFiles);
  };

  const getPreview = (idx: number) => previewUrls[idx] ?? null;
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) addFiles(files);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) addFiles(files);
  };
  const renderSlot = (idx: number, isMain = false) => {
    const url = getPreview(idx);
    const hasImage = !!url;
    const remain = previewUrls.length - 2 > 0 && previewUrls.length - 2 + "+";

    return (
      <div
        className={clsx(
          "relative h-24 border border-dashed  flex items-center justify-center overflow-hidden",
          hasImage ? "border-gray-300" : "border-gray-200"
        )}
      >
        {hasImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${url})`,
              opacity: 0.6,
            }}
          />
        )}

        {/* Content */}

        <div className="relative z-10 flex w-full h-full items-start justify-end p-1">
          {!hasImage ? (
            <CiImageOn size={28} className="text-gray-300 opacity-50" />
          ) : (
            <>
              <h1
                className={clsx(
                  "z-20 text-white text-2xl flex absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2",
                  { hidden: idx === 0 }
                )}
              >
                {remain}
              </h1>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className={clsx(
                  "bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-150"
                )}
                aria-label="Remove image"
              >
                <IoIosClose size={isMain ? 20 : 16} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-3">
        <label
          htmlFor="file-upload"
          onClick={openPicker}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={clsx(
            "relative h-24 border border-dashed flex flex-col items-center justify-center p-2 cursor-pointer transition-all",
            "hover:border-black",
            {
              "border-red-400 text-red-400": error,
              "border-black": isDragging && !error,
              "border-gray-300": !isDragging && !error,
            }
          )}
          // style={{
          //   backgroundImage: getPreview(0) ? `url(${getPreview(0)})` : "none",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   opacity: 0.6,
          // }}
        >
          {/* overlay text */}
          <div
            className={clsx(
              "absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity"
            )}
          >
            <CiImageOn
              size={28}
              className={clsx("text-gray-400", { hidden: isDragging })}
            />
            <p className="text-xs text-center mt-1 text-gray-600">
              {isDragging ? "Drop here" : "Click or drag to upload"}
            </p>
          </div>

          {/* hidden input */}
          <input
            id="file-upload"
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileSelect}
            {...props}
          />
        </label>

        {renderSlot(0)}

        <div className="relative">
          {renderSlot(1)}

          {/* +N overlay */}
          {value.length > 3 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xl font-semibold rounded-lg">
              +{value.length - 2}
            </div>
          )}
        </div>
      </div>

      {/* error */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
