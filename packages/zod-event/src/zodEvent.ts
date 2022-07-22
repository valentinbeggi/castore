import { O } from 'ts-toolbelt';
import { z, ZodType } from 'zod';

import { EventDetail, EventType } from '@castore/core';

export type OmitUndefinableKeys<Obj extends Record<string, unknown>> = Omit<
  Obj,
  O.UndefinableKeys<Obj>
>;

export class ZodEventType<
  T extends string = string,
  MS extends ZodType | undefined = ZodType | undefined,
  PS extends ZodType | undefined = ZodType | undefined,
  $D = OmitUndefinableKeys<{
    aggregateId: string;
    version: number;
    type: T;
    timestamp: string;
    payload: PS extends ZodType ? z.infer<PS> : undefined;
    metadata: MS extends ZodType ? z.infer<MS> : undefined;
  }>,
  D extends EventDetail = $D extends EventDetail ? $D : never,
> implements EventType<T, D>
{
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  _types: {
    detail: D;
  };
  type: T;
  payloadSchema?: PS;
  metadataSchema?: MS;

  constructor({
    type,
    payloadSchema,
    metadataSchema,
  }: {
    type: T;
    payloadSchema?: PS;
    metadataSchema?: MS;
  }) {
    this.type = type;
    this.payloadSchema = payloadSchema;
    this.metadataSchema = metadataSchema;
  }
}
