
# Deleting an items

To delete an item you simply specify its primary key.

Inspect `5-a-delete-item.js` and run it to delete the item we created in (2). 

Now run `3-a-get-item.js` to confirm it is gone (you still get a success, but `undefined` value returned). 

If you run `5-a-delete-item.js` again, it will still succeed, even though there was nothing to delete.

## Conditionally deleting an item

Run `2-a-put-item.js` again to create the item, and uncomment lines 15-22. Running `5-a-delete-item.js` we get a `ConditionalCheckFailedException` error - the item was not deleted because our expression failed.

Note we've provided teh conditional expression

    'AMOUNT < :minamount AND #type = :refund', 

Recall from (3) that `TYPE` is a reserved keyword so we use the `#type` placeholder, and then tell DynamoDB what that means.

We do something similar here for the amount 2000, except placeholders for values are specified a colon `:` (`:minamount` in our example), we then tell DynamoDB what value to use for that placeholder:

    ExpressionAttributeValues:{
        ":minamount": 2000
    },

It's required because DynamoDB needs to know the type of the value. We *could* have just replaced `:type` with `REFUND` as its a string - but we should use placeholders for any 'unknown' values to avoid injection attacks. Additionally, its just neater to use placeholders for *all* values.

Note:

 1. If we try hardcode the value `2000` into `ConditionExpression` the script fails
 2. We get an error if the item isn't deleted because it fails the condition expression.

Change `2000` to `'3000'` (a string) and run `5-a-delete-item.js` again. We get `ConditionalCheckFailedException` error again because the string type of the value doesn't match the number type of the item's `AMOUNT` attribute.

Now change it the number `3000` and run `5-a-delete-item.js` again. It succeeds.

Run it again - and it fails. Unlike unconditional deletes, conditional deletes will fail the second time as the condition is no longer met.
