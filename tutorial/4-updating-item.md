
# Updating an item

The `PUT` command will create or replace an item in its entirety. 

An `UPDATE` command allows you to update/add/remove specific attributes. This is useful for changing specific attributes without first having to read the item.

Inspect `4-a-update-item.js` and run it to retrieve the item we created in the last section.

The four 'operations' in an update are:

 - **SET**: Adds/replaces an attribute 
 - **REMOVE**: Removes an attribute from an item.
 - **ADD**: Increments/decrements a number or insert elements into a Set.
 - **DELETE**: Used to remove items from a Set.

## Set

This adds/replaces attributes in our item. Inspect `4-a-update-item.js` and note that we are changing the amount value and adding a new attribute 'TAGS'.

    'set #amount = :amount, #tags = :tags'


Recall from the previous section that `TYPE` was a reserved keyword so we use the `#type` placeholder, and then tell DynamoDB what that means (`AMOUNT` is not, but we use a placeholder here for consistency).

We do something similar here for the amount `100`, except placeholders for values are specified a colon `:` (`:amount` in our example), we then tell DynamoDB what value to use for that placeholder:

    ExpressionAttributeValues:{
        ":amount": 100
    },

It's required because DynamoDB needs to know the type of the value. However, we should use placeholders for any 'unknown' values to avoid injection attacks. Additionally, it's just neater to use placeholders for *all* values.

As an aside, we have used

     ddb.createSet(['high-priority', 'customer-callback'])

to create a `set` from an array (otherwise it would be treated as `list`).

Also note that we have set `ReturnValues` to `ALL_NEW`. We use this to specify the data we want to get back. Possible values are:

 - **NONE** \*(default) return nothing
 - **ALL_OLD** \* - the entire item before it was updated
 - **ALL_NEW** - the entire item after it was updated
 - **UPDATED_OLD** - the updated attributes before they were updated
 - **UPDATED_NEW** - the updated attributes after they were updated
 
(\* Also supported for the `put` and `delete` operations).

**Note:** Specifying a `ReturnValue` does NOT contribute to any RCU units.

## Add

In `4-b-update-item.js` we are adding to a number attribute:

    'add #amount :amount'

this increments it by `:amount`. Amazon recommends using `set` rather than `add`.

## Delete

In `4-c-update-item.js` we are deleting a value from our set:

    'DELETE #tags :tags'

**Important:** DynamoDB does not support empty sets. So deleting all values would remove the attribute:

    UpdateExpression: "DELETE #tags :tags",
    ExpressionAttributeNames: {
      '#tags' : "TAGS"
    },
    ExpressionAttributeValues: {
      ':tags' : ddb.createSet(['high-priority', 'customer-callback'])
    },

## Remove

Finally in `4-d-update-item.js` we remove the `TAGS` attribute. Note we can safely 'remove' attributes that don't exist in the item.

## Conditional updates

We can conditionally update an item by specifying a `ConditionExpression`. Inspect `4-e-update-item.js`, in particular note:

    UpdateExpression: 'set #amount = #amount + :increaseByAmount',
    ConditionExpression: '#amount < :maxamount',

We are using `set` to increment the amount by `:increaseAmount` (we could have alternatively used `add`), but only if the amount is less than `:maxamount`.

If you run that script, it should succeed for the first few runs but then fail with a `ConditionalCheckFailedException`.

