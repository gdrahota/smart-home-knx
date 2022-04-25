import mongoose, { Schema } from 'mongoose'

const { String, Boolean } = Schema.Types

export const collection = 'menu-items'

const MenuFeatureSchema = new Schema( {
  group: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  instanceId: {
    type: String,
    default: null,
  },
},
{
  _id: false,
} )

export const registerMenuItemModel = () => {
  const MenuItemSchema = new Schema( {
    name: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    feature: {
      type: MenuFeatureSchema,
      required: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
    insertSeparatorAfter: {
      type: Boolean,
      default: null,
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    strict: true,
  }
  )

  MenuItemSchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
  } )

  // prevent overwriting an existing model during unit testing
  try {
    mongoose.model( collection, MenuItemSchema )
  } catch ( error ) {
  }
}
