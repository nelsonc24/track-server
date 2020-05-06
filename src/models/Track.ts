import { model, Schema, Document } from 'mongoose';
import { User } from './User';

export interface Coords extends Document {
    latitude: number,
    longitude: number,
    altitude: number,
    accuracy: number,
    heading: number,
    speed: number,
}
export interface PointSchema extends Document {
    timestamp: number,
    coords: Coords
}

export interface TrackSchema extends Document {
    userId: User,
    name: string,
    localtions: PointSchema[]
}

const pointSchema = new Schema({
    timestamp: Number,
    coords:{
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number,
    }

})

const trackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
});

model<TrackSchema>('Track', trackSchema);