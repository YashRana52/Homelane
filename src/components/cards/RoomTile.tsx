import { Link } from 'react-router';

import { SIZES, photo } from '@/config/images';
import type { Room } from '@/data/rooms';
import { formatIndianNumber } from '@/lib/formatINR';
import { AspectImage } from '@/ui';

type RoomTileProps = {
  room: Room;
  /** Show the catalogue count under the label. Off on the densest grids. */
  showCount?: boolean;
};

/**
 * A room category, as a photo with its name over it.
 *
 * The label sits on a scrim rather than directly on the photo — a white label
 * over a bright kitchen fails contrast, and these tiles are small enough that
 * the text is already working hard.
 */
export function RoomTile({ room, showCount = true }: RoomTileProps) {
  const img = photo(room.photo, 'square', 640);

  return (
    <Link
      to={room.to}
      className="group relative block overflow-hidden rounded-md focus-visible:outline-offset-4"
    >
      <AspectImage
        src={img.src}
        srcSet={img.srcSet}
        sizes={SIZES.tile}
        alt=""
        ratio="square"
        zoomOnHover
      />

      <span className="image-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

      <span className="absolute inset-x-0 bottom-0 p-3">
        <span className="text-btn block text-white">{room.label}</span>
        {showCount && (
          // Hidden on the two-up phone grid, where a tile is too small to
          // carry a second line without crowding the label.
          <span className="text-caption mt-0.5 hidden text-white/75 sm:block">
            {formatIndianNumber(room.designCount)} designs
          </span>
        )}
      </span>
    </Link>
  );
}
