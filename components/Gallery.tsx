import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: '/Imagenes/imagen clinivet 1.jpeg',
    alt: 'CliniVet - Instalaciones',
    category: 'instalaciones',
  },
  {
    id: 2,
    src: '/Imagenes/imagen clinivet 2.jpeg',
    alt: 'CliniVet - Atención',
    category: 'atencion',
  },
  {
    id: 3,
    src: '/Imagenes/imagen clinivet 3.jpeg',
    alt: 'CliniVet - Equipo',
    category: 'equipo',
  },
  {
    id: 4,
    src: '/Imagenes/imagen clinivet 4.jpeg',
    alt: 'CliniVet - Servicios',
    category: 'servicios',
  },
  {
    id: 5,
    src: '/Imagenes/imagen clinivet 5.jpeg',
    alt: 'CliniVet - Cuidado',
    category: 'cuidado',
  },
  {
    id: 6,
    src: '/Imagenes/imagen clinivet 6.jpeg',
    alt: 'CliniVet - Mascotas',
    category: 'mascotas',
  },
  {
    id: 7,
    src: '/Imagenes/imagen clinivet 7.jpeg',
    alt: 'CliniVet - Consulta',
    category: 'consulta',
  },
  {
    id: 8,
    src: '/Imagenes/imagen clinivet 8.jpeg',
    alt: 'CliniVet - Tratamiento',
    category: 'tratamiento',
  },
  {
    id: 9,
    src: '/Imagenes/imagen clinivet 9.jpeg',
    alt: 'CliniVet - Bienestar',
    category: 'bienestar',
  },
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-vet-cream to-vet-blue-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-vet-yellow-pastel rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-vet-orange-pastel rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-vet-orange-deep to-vet-yellow-deep"></span>
            <span className="text-vet-blue font-medium tracking-widest uppercase text-sm">
              Nuestra Galería
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-vet-blue-dark mb-6">
            Momentos <span className="italic bg-gradient-to-r from-vet-orange-deep to-vet-yellow-deep bg-clip-text text-transparent">Especiales</span>
          </h2>
          <p className="text-vet-blue-dark/70 text-lg max-w-2xl mx-auto">
            Descubre nuestras instalaciones, equipo y los momentos que compartimos con las mascotas que cuidamos con amor.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-card ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`${index === 0 || index === 5 ? 'h-80 md:h-full' : 'h-48 md:h-64'}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-vet-blue-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{image.alt}</p>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <ZoomIn className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Colored border on hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-vet-orange-deep rounded-2xl transition-colors duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-vet-dark/95 backdrop-blur-sm z-[200] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-vet-orange-deep/80 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-vet-orange-deep/80 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-contain rounded-xl shadow-2xl"
              />
              <p className="text-center text-white/80 mt-4 font-medium">
                {galleryImages[selectedImage].alt}
              </p>
              <p className="text-center text-white/50 text-sm mt-1">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
