import { Response } from 'express';

export const handleNotFound = (res: Response, entity = 'Item') =>
  res.status(404).json({ message: `No ${entity.toLowerCase()} with this id!` });

export const handleRelationNotFound = (
    res: Response,
    createdEntity = 'Item',
    missingRelation = 'Related item'
  ) =>
    res.status(404).json({
      message: `${createdEntity} created but no ${missingRelation.toLowerCase()} with this id!`,
    });