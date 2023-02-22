import mongoose, { Document, Schema } from 'mongoose';

export interface IList {
    name: string;
    owner_id: mongoose.Types.ObjectId;
}

export interface IListModel extends IList, Document {};

const ListSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        owner_id: { type: mongoose.Types.ObjectId, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IListModel>('List', ListSchema);