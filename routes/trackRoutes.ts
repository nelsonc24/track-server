import { Request, Response, Router } from 'express';
import { model } from 'mongoose';
import requireAuth from '../src/middlewares/requireAuth';
import { TrackSchema } from '../src/models/Track';

const Track = model<TrackSchema>('Track');

const trackRoutes = Router();

trackRoutes.use(requireAuth);

trackRoutes.get('/tracks', async (req: any, res: Response) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

trackRoutes.post('/tracks', async (req: any, res: Response) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

export default trackRoutes;
