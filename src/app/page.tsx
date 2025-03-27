import fs from "fs";
import path from "path";
import Image from "next/image";

const IMAGE_DIRECTORY = "/run/media/luxcium/2TB-Seagate/MJ-backups/others/generation_361fee5e-9471-4c5b-ab1c-8f5fcd216b47_images";

export default function CatalogPage() {
  // Read image files from the directory
  const images = fs
    .readdirSync(IMAGE_DIRECTORY)
    .filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Image Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image} className="relative w-full h-64">
            <Image
              src={path.join(IMAGE_DIRECTORY, image)}
              alt={image}
              layout="fill"
              objectFit="cover"
              className="rounded shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
