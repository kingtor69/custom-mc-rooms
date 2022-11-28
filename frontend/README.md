# Aspen-Therevol's Custom Minecraft Experiences

## All code copyright 2021 by Tor Kingdon except:
PayPal buttons and `paypal.js` copyright PayPal Inc and used according to their terms.
reCaptcha copyright Google, Inc and used according to their terms.

More about Tor Kingdon:
 - github: kingtor69
 - `kingtorcodes.com`

## This is being manually deployed to `https://tree-sentience.com/mc` on dreamhost servers.
 - updates are noted in each file in the format *yyyymmdd-hhmm*mst (all timestamps are Mountain Standard Time, thus 'mst')
 - the last update was on **20220205-1311mst** 

## NEEDS BACK END
`https://github.com/kingtor69/tree-sentience-api` has a simple back end consisting of one API call
 | endpoint | verb | description |
 | :------- | :--- | :---------- |
 | /api/mc/confirmation/ | POST | sends email confirmation to MC room builder |

 | param | content | required? |
 | :---- | :------ | :-------: |
 | payment_confirmation: id | payment confirmation id from PayPal | yes |
 | payment_confirmation: payer: name | full name of payer |
 | payment_confirmation: payer: email | email address of payer | yes |
 | :---- | :------ | :-------: |
 | form_data: template | type of minecraft experience | yes |
 | form_data: color | color scheme | yes |
 | form_data: message | message to recipient | yes |
 | form_data: name | name of gift giver | no |
 | form_data: email | email for files to be sent | yes |
 | recipient | name of gift recipient | no |