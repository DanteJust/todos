import mongoose, { Document, Schema } from 'mongoose';

export interface IItem {
    title: string;
    text: string;
    deadline: string;
    list_id: string;
    status: string;
}

export interface IItemModel extends IItem, Document {};

const ItemSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        deadline: { type: String, required: true },
        list_id: { type: mongoose.Types.ObjectId, required: true },
        status: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IItemModel>('Item', ItemSchema);