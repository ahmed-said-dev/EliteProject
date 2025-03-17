import { useState } from 'react';

export function Gallery({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const closeModal = () => setSelectedItem(null);

  return (
    <div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer group relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-play text-4xl text-white opacity-80 group-hover:opacity-100 transition-opacity"></i>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <div className="w-full p-4 text-white bg-gradient-to-t from-black/60">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="max-w-4xl w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-auto"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  className="w-full h-auto"
                  poster={selectedItem.thumbnail}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
