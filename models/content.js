import mongoose, { Schema, model, models } from 'mongoose';

const ContentSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Content = models.Content || model('Content', ContentSchema);

export default Content;
