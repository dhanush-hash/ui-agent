import { DesignationNode } from '@/components/composed/DesignationNode';
import { DesignationConnector } from '@/components/composed/DesignationConnector';
import type { DesignationTreeProps } from './DesignationTree.types';

/**
 * Canvas position of each node, faithful to the Figma frame where branch views
 * are absolutely placed in a descending staircase (Δx≈73px, Δy≈119px from the
 * top-left origin). These are diagram coordinates, not reusable layout spacing.
 */
const NODE_POSITION = [
  'left-[45px] top-[45px]',
  'left-[118px] top-[164px]',
  'left-[191px] top-[283px]',
  'left-[264px] top-[402px]',
  'left-[337px] top-[521px]',
  'left-[410px] top-[640px]',
  'left-[483px] top-[759px]',
  'left-[556px] top-[878px]',
] as const;

/** Connector sits below a node card (box bottom ≈ 64px) and reaches the next. */
const CONNECTOR_OFFSET = 'left-[20px] top-[64px]';

/** Presentational org-hierarchy diagram: positioned node cards joined by connectors. */
export function DesignationTree({ designations }: DesignationTreeProps) {
  return (
    <div className="relative h-full min-h-[460px] w-full">
      {designations.map((designation, index) => {
        const position = NODE_POSITION[index] ?? NODE_POSITION[NODE_POSITION.length - 1];
        const isLast = index === designations.length - 1;

        return (
          <div key={designation.id} className={`absolute ${position}`}>
            <DesignationNode
              level={designation.level}
              label={designation.label}
              variant={designation.variant}
            />
            {!isLast && <DesignationConnector className={CONNECTOR_OFFSET} />}
          </div>
        );
      })}
    </div>
  );
}
