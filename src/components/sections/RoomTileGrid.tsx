import { ArrowRight } from 'lucide-react';

import { RoomTile } from '@/components/cards/RoomTile';
import { rooms } from '@/data/rooms';
import { Button, Eyebrow, Heading, Reveal, Section } from '@/ui';

/**
 * The twelve room-category tiles.
 *
 * 2 → 3 → 4 → 6 columns, so twelve tiles always fill complete rows at every
 * breakpoint. The design count is hidden below `sm`, where a two-up tile is
 * too small to carry a second line without crowding the label.
 */
export function RoomTileGrid() {
  return (
    <Section pad="lg">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Get inspired</Eyebrow>
          <Heading as="h2" level="h2" className="mt-2 max-w-[18ch]">
            Ideas for every room in the house.
          </Heading>
        </div>
        <Button
          to="/design-ideas"
          variant="link"
          iconRight={<ArrowRight className="size-4" />}
          className="shrink-0"
        >
          View all design ideas
        </Button>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {rooms.map((room, i) => (
          <Reveal as="li" key={room.id} delay={Math.min(i * 0.04, 0.3)}>
            <RoomTile room={room} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
