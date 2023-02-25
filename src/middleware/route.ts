import { Request, Response } from 'express';

const methodNotAllowed = (req: Request, res: Response) => {
    return res.status(405).json({ message: 'This method is not allowed on this endpoint!' });
}

const incorrectRoute = (req: Request, res: Response) => {
    return res.status(404).json({ message: 'Incorrect route!' });
}

export default { methodNotAllowed, incorrectRoute };