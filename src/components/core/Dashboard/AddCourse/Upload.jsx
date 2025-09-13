import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  accept = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept 
      ? accept.includes('.pdf') 
        ? { "application/pdf": [".pdf"] }
        : { [accept]: [accept] }
      : !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-black" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
  className={`${
    isDragActive ? "bg-mwhite" : "bg-mwhite"
  } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-black`}
  {...getRootProps()}
>
  <input {...getInputProps()} ref={inputRef} />
        {previewSource ? (
        <div className="flex w-full flex-col p-6">
          {!video && !accept?.includes('.pdf') ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : accept?.includes('.pdf') ? (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl text-red-500 mb-2">📄</div>
              <p className="text-sm text-black font-medium">PDF File Selected</p>
              <p className="text-xs text-gray-600 mt-1">{selectedFile?.name}</p>
            </div>
          ) : (
            <Player aspectRatio="16:9" playsInline src={previewSource} />
          )}
          {!viewData && (
            <button
              type="button"
              onClick={() => {
                setPreviewSource("")
                setSelectedFile(null)
                setValue(name, null)
              }}
              className="mt-3 text-black underline"
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
    <div className="flex w-full flex-col items-center p-6">
      <div
        className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800"
        onClick={() => inputRef.current.click()} // Manually trigger click
      >
        <FiUploadCloud className="text-2xl text-yellow-50" />
      </div>
      <p className="mt-2 max-w-[200px] text-center text-sm text-black">
        Drag and drop an {accept?.includes('.pdf') ? "PDF" : !video ? "image" : "video"}, or click to{" "}
        <span className="font-semibold text-yellow-50">Browse</span> a file
      </p>
      <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-black">
        <li>Aspect ratio 16:9</li>
        <li>Recommended size 1024x576</li>
      </ul>
    </div>
  )}
</div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}