import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap gap-1 justify-center mt-6 mb-2">
            {links.map((link, index) => {
                let label = link.label;
                if (label.toLowerCase().includes('previous')) label = '« Previous';
                if (label.toLowerCase().includes('next')) label = 'Next »';

                return link.url === null ? (
                    <div
                        key={index}
                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded-xl font-mono opacity-50"
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                ) : (
                    <Link
                        key={index}
                        className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded-xl font-mono hover:bg-gray-50 focus:border-orange-500 focus:text-orange-500 transition-colors shadow-sm ${
                            link.active ? 'bg-orange-50 text-orange-500 border-orange-500 font-bold' : 'bg-white text-gray-500 border-gray-200'
                        }`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}
