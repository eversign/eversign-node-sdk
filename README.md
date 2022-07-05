# eversign node.js SDK

eversign Node.js SDK is the official Node Wrapper around the eversign [API](https://eversign.com/api/documentation).

**Quick Links:**

-   [Create Document Example](/examples/create_document.js)
-   [Use Template Example](/examples/create_document_from_template.js)
-   [Document Operations](/examples/document_operations.js)
-   [Create Iframe Signature](/examples/iframe.js)
-   [Create Iframe Signature From Template](/examples/iframe_template.js)

## Installation

Install from npm:

```sh
cd your_project
npm install eversign
```

Install from code:

```sh
git clone https://github.com/eversign/eversign-node-sdk.git
cd eversign-node-sdk
# install dependencies
npm install
```

## Usage

All eversign API requests are made using the `Client` class, which contains all methods for creating, retrieving and saving documents. This class must be initialized with your API access key string. [Where is my API access key?](https://eversign.com/api/documentation/intro#api-access-key)

Please also specify the ID of the eversign business you would like this API request to affect. [Where is my Business ID?](https://eversign.com/api/documentation/intro#business-selection)

In your Node application, require `eversign` (or the path to the sdk folder if not using npm) and pass authentication information to initialize it:

```javascript
// Initialize using api key
const { Client } = require('eversign');
const client = new Client('YOUR_API_KEY', 'YOUR_BUSINESS_ID');
```

Any object (i.e. entity) used in the below examples is to be required prior to its use, for instance:

```javascript
const { Document, Template, Signer, Recipient, File } = require('eversign');
```

### Fetch businesses

Using the `getBusinesses()` function all businesses on the eversign account will be fetched and listed along with their Business IDs.
You can also set the selected business with a call to `client.setSelectedBusiness(Business)`

```javascript
client.fetchBusinesses().then(function(businesses) {
    console.log(businesses[0].getBusinessId());

    client.setSelectedBusiness(businesses[0]);
});
```

If you know the `businessId` beforehand you can also set it with `setSelectedBusinessById(businessId)`

```javascript
client.setSelectedBusinessById(1337);
```

### Create document from template [Method: Use Template]

To create a document based on an already created template you can use the class `Template`. In order to identify which template should be used, please pass the template's ID into the `setTemplateId("MY_TEMPLATE_ID")` function.

```javascript
const template = new Template();
template.setTemplateId('MY_TEMPLATE_ID');
template.setTitle('Title goes here');
template.setMessage('Test Message');
```

#### Fill signing roles [Method: Use Template]

A template's signing and CC roles are filled just using the functions below. Each role is identified using the `setRole()` function, must carry a name and email address and is appended to the document using the `appendSigner()` function.

```javascript
const signer = new Signer();
signer.setRole('Testrole');
signer.setName('John Doe');
signer.setEmail('john.doe@eversign.com');
template.appendSigner(signer);
```

#### Saving the document object [Method: Use Template]

Your document object can now be saved using the `createDocumentFromTemplate()` function. Once this function has been called successfully, your document is created and the signing process is started.

```javascript
client.createDocumentFromTemplate(documentTemplate).then(function(document) {
    const newlyCreatedDocument = document;
});
```

### Creating a document [Method: Create Document]

A document is created by instantiating the `Document` object and setting your preferred document properties. There is a series of `set` methods available used to specify options for your document. All available methods can be found inside our extensive [Create Document Example](/examples/create_document.js).

```javascript
const document = new Document();
document.setTitle('Title goes here');
document.setMessage('My Message');
```

#### Adding signers to a document [Method: Create Document]

Signers are added to an existing document object by instantiating the `Signer` object and appending each signer to the document object. Each signer object needs to come with a Signer ID, which is later used to assign fields to the respective signer. If no Signer ID is specified, the `appendSigner()` method will set a default incremented Signer ID. Each signer object also must contain a name and email address and is appended to the document using the `appendSigner()` method.

```javascript
const signer = new Signer();
signer.setName('Tester Test');
signer.setEmail('tester@gmail.com');
document.appendSigner(signer);
```

#### Adding recipients (CCs) to a document [Method: Create Document]

Recipients (CCs) are added by instantiating the `Recipient` object and appending each recipient to the document object. Just like signers, recipients must carry a name and email address.

```javascript
const recipient = new Recipient();
recipient.setName('Tester Test');
recipient.setEmail('tester@gmail.com');
document.appendRecipient(recipient);
```

#### Adding files to the Document [Method: Create Document]

Files are added to a document by instantiating an `File` object. The standard way of choosing a file to upload is appending the file's path using the `setFilePath()` method and then appending your file using the `appendFile()` method.

```javascript
const file = new File({
    name: 'My File',
    filePath: './placeholder.pdf'
});
document.appendFile(file);
```

#### Adding fields [Method: Create Document]

There is a number of fields that can be added to a document, each coming with different options and parameters. ([Viel Full list of fields »](https://eversign.com/api/documentation/fields))

A field is appended to the document using the `appendFormField(signatureField)` method. Please note that you can set the file that the Field should be added to with the `setFileIndex` method of the FormField.

Signature and Initials fields are required to be assigned to a specific signer. Fields are assigned to a signer by passing the **Signer ID** into the `setSigner()` function.

```javascript
const signatureField = new SignatureField();
signatureField.setFileIndex(0);
signatureField.setPage(1);
signatureField.setX(30);
signatureField.setY(150);
signatureField.setRequired(true);
signatureField.setSigner('1');
document.appendFormField(signatureField);
```

#### Saving a document [Method: Create Document]

A document is saved and sent out by passing the final document object into the `createDocument` method. The API will return the entire document object array in response.

```javascript
client.createDocument(document).then(function(savedDocument) {
    const newlyCreatedDocument = savedDocument;
});
```

#### Loading a document

A document is loaded by passing its document hash into the `getDocumentByHash()` method.

```javascript
client.getDocumentByHash('MY_HASH').then(function(document) {
    console.log(document.getTitle());
});
```

#### Downloading the raw or final document

A document can be downloaded either in its raw or in its final (completed) state. In both cases, the respective method must contain the document object and a path to save the PDF document to. When downloading a final document, you can choose to attach the document's Audit Trail by setting the third parameter to `true`.

```javascript
client.downloadRawDocumentToPath(document, './raw.pdf').then(function(res) {
    console.log(res);
});
client
    .downloadFinalDocumentToPath(document, './final.pdf', true)
    .then(function(res) {
        console.log(res);
    });
```

#### Get a list of documents or templates

The Client class is also capable fo listing all available documents templates based on their status. Each method below returns an array of document objects.

```javascript
client.getAllDocuments().then(function(documents) {
    console.log(documents);
});

/*Other Methods for getting documents are:
client.getCompletedDocuments();
client.getDraftDocuments();
client.getCanceledDocuments();
client.getActionRequiredDocuments();
client.getWaitingForOthersDocuments();

client.getTemplates();
client.getArchivedTemplates();
client.getDraftTemplates();
*/
```

#### Delete or cancel a document

A document is cancelled or deleted using the methods below.

```javascript
client.deleteDocument(document);
client.cancelDocument(document);
```

### Contact us

Any feedback? Please feel free to [contact our support team](https://eversign.com/contact).

## Development

### Setting up environment

```
docker run -ti --rm -p 8080:8080 -v $(pwd):/opt/sdk -w /opt/sdk node bash
npm install
node examples/create_document.js
```

### Running tests
```
npm run test
```

### Publishing
- Make sure our change is working and properly deployed to master branch.
- Run tests with `npm run test`
- Bump up version in package.json
- Login to npm account with a permission to publish with `npm login`
- Publish new version with `npm publish`
- You will receive an email with confirmation that new package version is published.
