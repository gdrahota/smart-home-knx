import { connectToMongoDb } from '@/infrastructure/mongodb'
import { collection } from './index'
import mongoose from 'mongoose'
import { iMenuItem } from '@/services/menu-items'

beforeAll( async () => {
  await connectToMongoDb()
} )

describe( 'mongoose schema validator "requiredStringValidator"', () => {
  test( '====> ====>', async () => {
    const menuItem: iMenuItem = {
      name: 'Menu Item ABC',
      parentId: null,
      feature: {
        group: 'group-1',
        name: 'name-1',
        instanceId: 'instance-1',
      },
      icon: null,
      iconColor: null,
      insertSeparatorAfter: null,
      updatedAt: new Date(),
    }

    const test = await mongoose.model( collection ).create( menuItem ) as unknown as iMenuItem
    expect( test ).toBeDefined()
    expect( test._id ).toBeDefined()
    expect( test.name ).toEqual( menuItem.name )
    expect( test.parentId ).toEqual( menuItem.parentId )
    expect( test.iconColor ).toEqual( menuItem.iconColor )
  } )
} )
