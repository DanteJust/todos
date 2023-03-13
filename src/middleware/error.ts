import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const printPossibleErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
}

const methodNotAllowed = (req: Request, res: Response) => {
    return res.status(405).json({ message: 'This method is not allowed on this endpoint!' });
}

const incorrectRoute = (req: Request, res: Response) => {
    return res.status(404).json({ message: 'Incorrect route!' });
}

export default { printPossibleErrors, incorrectRoute, methodNotAllowed };