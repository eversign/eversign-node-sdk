declare module 'eversign' {

    export import Client = require('eversign/lib/Client')
    export import Document = require('eversign/lib/Document')
    export import Business = require('eversign/lib/Business')
    export import AttachmentField = require('eversign/lib/AttachmentField')
    export import CheckboxField = require('eversign/lib/CheckboxField')
    export import DateSignedField = require('eversign/lib/DateSignedField')
    export import Template = require('eversign/lib/DocumentTemplate')  // Note: Not matching regex!
    export import DropdownField = require('eversign/lib/DropdownField')
    export import Field = require('eversign/lib/Field')
    export import File = require('eversign/lib/File')
    export import FormField = require('eversign/lib/FormField')
    export import InitialsField = require('eversign/lib/InitialsField')
    export import NoteField = require('eversign/lib/NoteField')
    export import RadioField = require('eversign/lib/RadioField')
    export import Recipient = require('eversign/lib/Recipient')
    export import Request = require('eversign/lib/Request')
    export import SignatureField = require('eversign/lib/SignatureField')
    export import Signer = require('eversign/lib/Signer')
    export import TextField = require('eversign/lib/TextField')
    export import CheckboxGroupField = require('eversign/lib/CheckboxGroupField')
    export import TextFormField = require('eversign/lib/TextFormField')
    export import OAuthTokenRequest = require('eversign/lib/OAuthTokenRequest')

}

declare module 'eversign/lib/Client' {
    import Business = require('eversign/lib/Business')
    import Document = require('eversign/lib/Document')
    import File = require('eversign/lib/File')
    import OAuthTokenRequest = require('eversign/lib/OAuthTokenRequest')
    import Signer = require('eversign/lib/Signer')
    import Template = require('eversign/lib/DocumentTemplate')  // Note: Not matching regex!
    class Client {
        public constructor(accessKey: string, businessId: number)
        /**
         * Retrieves the documents from eversign API
         */
        public getAllDocuments(): Promise<Document[]>
        /**
         * Retrieves all canceled documents from eversign API
         */
        public getCancelledDocuments(): Promise<Document[]>
        /**
         * Returns all Documents for the Client which require Actions
         */
        public getActionRequiredDocuments(): Promise<Document[]>
        /**
         * Returns all Documents for the Client which are waiting on responses
         */
        public getWaitingForOthersDocuments(): Promise<Document[]>
        /**
         * Returns a list of Documents which are set to be Templates
         */
        public getTemplates(): Promise<Document[]>
        /**
         * Returns a list of Documents which are set to be Templates
         */
        public getArchivedTemplates(): Promise<Document[]>
        /**
         * Returns a list of Documents which are set to be Templates
         */
        public getDraftTemplates(): Promise<Document[]>
        public createDocument(document: Document | Template): Promise<Document>
        public uploadFile(file: File): Promise<unknown>
        /**
         * Retrieves all available Business for the current Client
         */
        public fetchBusinesses(): Promise<Business[]>
        public setSelectedBusiness(business: Business): void
        public setSelectedBusinessById(businessId: number): void
        public getBusinesses(): Business[]
        /**
         * Sending a Reminder to a specific Signer inside a Document
         * Both properties are required in order to send the request.
         * Returns true or false whether the reminder has been sent
         */
        public sendReminderForDocument(document: Document, signer: Signer): Promise<void>
        /**
         * Fetches the Document with the specified Hash from the API
         */
        public getDocumentByHash(documentHash: string): Promise<Document>
        /**
         *
         */
        public createDocumentFromTemplate(template: Template): Promise<Document>
        /**
         * Deletes the specified Document. Only works on Drafts and canceled Documents
         */
        public deleteDocument(document: Document, type: string): Promise<void>
        public cancelDocument(document: Document): Promise<void>
        /**
         * Downloads the completed Document. Only works on Documents that have
         * been completed. If you want the Audit Trail on the downloaded File
         * as well, set the auditTrail Parameter to true
         */
        public downloadFinalDocumentToPath(document: Document, path: string, auditTrail?: boolean): Promise<boolean>
        /**
         * Downloads the raw Document to the specified Path.
         * Returns true if saving was successful, otherwise false
         */
        public downloadRawDocumentToPath(document: Document, path: string): Promise<boolean>

        /**
         * Return a timed url to download the requested Document.
         */
        public getDocumentDownloadUrl(documentId: string, auditTrail?: boolean, type?: "download_final_document" | "download_raw_document"): Promise<string>
        /**
         *
         */
        public generateOAuthAuthorizationUrl(tokenRequest: OAuthTokenRequest): string
        /**
         * Requests a OAuth Access Token
         */
        public requestOAuthToken(tokenRequest: OAuthTokenRequest): Promise<string>
        /**
         * Sets a OAuth Access Token to beeing used as the access_key
         */
        public setOAuthAccessToken(oauthToken: string): void

    }

    export = Client
}

declare module 'eversign/lib/Document' {
    import Client = require('eversign/lib/Client')
    import File = require('eversign/lib/File')
    import FormField = require('eversign/lib/FormField')
    import LogEntry = require('eversign/lib/LogEntry')
    import Recipient = require('eversign/lib/Recipient')
    import Signer = require('eversign/lib/Signer')

    class Document {
        constructor(newDocument?: Partial<Document.IObject>)
        public appendFile(file: File): void
        public appendFile(file: File): void
        public appendFormField(formField: FormField): void
        public appendMeta(key: string, value: string): void
        public appendRecipient(recipient: Recipient): void
        public appendSigner(signer: Signer): void
        public getClient(): Client
        public getCustomRequesterEmail(): string
        public getCustomRequesterName(): string
        public getDocumentHash(): string
        public getEmbeddedSigningEnabled(): boolean
        public getExpires(): Date
        public getFields(): FormField[]
        public getFiles(): File[]
        public getIsCancelled(): boolean
        public getIsCompleted(): boolean
        public getIsDeleted(): boolean
        public getIsDraft(): boolean
        public getLog(): LogEntry[]
        public getMessage(): string
        public getMeta(): Record<string, string>
        public getRecipients(): Recipient[]
        public getRedirect(): string
        public getRedirectDecline(): string
        public getReminders(): boolean
        public getRequesterEmail(): string
        public getRequireAllSigners(): boolean
        public getSandbox(): boolean
        public getSigners(): Signer[]
        public getTemplateId(): string
        public getTitle(): string
        public getUseSignerOrder(): boolean
        public removeMeta(key: string): void
        public setClient(client: Client): void
        public setCustomRequesterEmail(email: string): void
        public setCustomRequesterName(name: string): void
        public setDocumentHash(hash: string): void
        public setEmbeddedSigningEnabled(newEmbeddedSigningEnabled: boolean): void
        public setExpires(expires: Date): void
        public setFields(fields: FormField[]): void
        public setIsDraft(isDraftNew: boolean): void
        public setMessage(message: string): void
        public setMeta(newMeta: Record<string, string>): void
        public setRecipients(recipients: Recipient[]): void
        public setRedirect(redirect: string): void
        public setRedirectDecline(redirectDecline: string): void
        public setReminders(newReminders: boolean): void
        public setRequesterEmail(email: string): void
        public setRequireAllSigners(newRequireAllSigners: boolean): void
        public setSandbox(sandbox: boolean): void
        public setSigners(signers: Signer[]): void
        public setTemplateId(templateId?: string | undefined): void
        public setTitle(title: string): void
        public setUseSignerOrder(newUseSignerOrder: boolean): void
        public toObject(): Document & Document.IObject
    }
    namespace Document {
        interface IObject {
            /**
             * Document Hash to identify its authenticity
             */
            documentHash : string,

            /**
             * Sandboxmode
             */
            sandbox : boolean,

            /**
             * E-Mail address of the requester
             */
            requesterEmail: string,
            /**
             * Set to true in order to save this document as a draft.
             */
            isDraft : boolean,
            /**
             * Check if the document is completed.
             */
            isCompleted: boolean,

            /**
             * Check if the document is archived.
             */
            isArchived: boolean,

            /**
             * Check if the document is deleted.
             */
            isDeleted: boolean,

            /**
             * Check if the document is in the trash.
             */
            isTrashed: boolean,

            /**
             * Check if the document has been canceled.
             */
            isCancelled: boolean,

            /**
             *
             */
            embedded: boolean,

            /**
             * Sets the title of the Document.
             */
            title: string,

            /**
             * Used in order to specify a document message.
             */
            message: string,

            /**
             * Set to true to define a specific order of the Signers
             */
            useSignerOrder: boolean,

            /**
             * Whether the Document is a Template or not
             */
            isTemplate: boolean,

            /**
             * Set to true to enable Auto Reminders for this Document
             */
            reminders: boolean,

            /**
             * Set to true requires all signers to sign the document to complete it
             */
            requireAllSigners: boolean,

            /**
             * Used to specify a custom requester name for this document.
             * If used, all email communication related to this document and signing-related
             * notifications will carry this name as the requester (sender) name.
             */
            custom_requester_name: string,

            /**
             * Used to specify a custom requester email address for this document.
             * If used, all email communication related to this document and signing-related
             * notifications will carry this email address as the requester (sender) email address.
             */
            custom_requester_email: string,

            /**
             * This parameter is used to specify a custom completion redirect URL.
             * If empty the default Post-Sign Completion URL of the current Business will be used
             */
            redirect: string,


            /**
             * This parameter is used to specify a custom completion redirect_decline URL.
             * If empty the default Post-Sign Decline URL of the current Business will be used
             */
            redirect_decline: string,

            /**
             * This parameter is used to specify an internal reference for your application,
             * such as an identification string of the server or client making the API request.
             */
            client: Client,

            /**
             * Expiration Time of the Document, default expiration time will be used if unset
             */
            expires: Date,

            /**
             * Array of Signer Objects which are associated with the Document
             */
            signers: Signer[],

            /**
             * Array of Recipient Objects which are associated with the Document
             */
            recipients: Recipient[],

            /**
             * Array of LogEntry Objects which are associated with the Document
             */
            log : LogEntry[],

            /**
             * Array of FormField Objects and there respective Subclass
             */
            fields: FormField[],

            /**
             * Array of File Objects which are associated with the Document
             */
            files: File[],

            /**
             * Array of Custom Meta Tags which are associated with the Document
             */
            meta: Record<string, string>,

            /**
             * Wheter the document has embedded/iframe signing enabled
             */
            embeddedSigningEnabled: boolean,

        }
    }

    export = Document
}

declare module 'eversign/lib/Business' {
    class Business {

    }

    export = Business
}

declare module 'eversign/lib/AttachmentField' {
    class AttachmentField {

    }

    export = AttachmentField
}

declare module 'eversign/lib/CheckboxField' {
    class CheckboxField {

    }

    export = CheckboxField
}

declare module 'eversign/lib/DateSignedField' {
    class DateSignedField {

    }

    export = DateSignedField
}

declare module 'eversign/lib/CheckboxGroupField' {
    class CheckboxGroupField {

    }

    export = CheckboxGroupField
}

declare module 'eversign/lib/DocumentTemplate' {
    import Client = require('eversign/lib/Client')
    import Field = require('eversign/lib/Field')
    import File = require('eversign/lib/File')
    import Recipient = require('eversign/lib/Recipient')
    import Signer = require('eversign/lib/Signer')

    /**
     * An existing template can be used by making an HTTP POST request to the
     * document containing some key parameters.
     * All optional and required parameters are listed in the table below.
     *
     * @param       {String} templateId [description]
     * @constructor
     */
    class DocumentTemplate {
        public constructor(templateId?: string)
        public appendField(field: Field): void
        public appendRecipient(recipient: Recipient): void
        public appendSigner(signer: Signer): void
        public appendFile(file: File): void
        public getClient(): Client
        public getCustomRequesterEmail(): string
        public getCustomRequesterName(): string
        public getEmbeddedSigningEnabled(): boolean
        public getExpires(): Date
        public getFields(): Field[]
        public getFiles(): File[]
        public getMessage(): string
        public getRecipients(): Recipient[]
        public getRedirect(): string
        public getRedirectDecline(): string
        public getSandbox(): boolean
        public getSigners(): Signer[]
        public getTemplateId(): string
        public getTitle(): string
        public setClient(client: Client): void
        public setCustomRequesterEmail(email: string): void
        public setCustomRequesterName(name: string): void
        public setEmbeddedSigningEnabled(newEmbeddedSigningEnabled: boolean): void
        public setExpires(expires: Date): void
        public setFields(fields: Field[]): void
        public setMessage(message: string): void
        public setRecipients(recipients: Recipient[]): void
        public setRedirect(redirect: string): void
        public setRedirectDecline(redirect_decline: string): void
        public setSandbox(sandbox: boolean): void
        public setSigners(signers: Signer[]): void
        public setTemplateId(templateId?: string | undefined): void
        public setTitle(title: string): void
        public toObject(): DocumentTemplate & DocumentTemplate.IObject
    }
    namespace DocumentTemplate {
        interface IObject {
            /**
             * Set to the Template ID of the template you would like to use
             */
            templateId: string,
            /**
             * Sets the title of the Document.
             */
            title: string,
            /**
             * Sandboxmode
             */
            sandbox: boolean,
            /**
             * Used in order to specify a document message.
             */
            message: string,
            /**
             * Used to specify a custom requester name for this document.
             * If used, all email communication related to this document and signing-related
             * notifications will carry this name as the requester (sender) name.
             */
            custom_requester_name?: string,
            /**
             * Used to specify a custom requester email address for this document.
             * If used, all email communication related to this document and signing-related
             * notifications will carry this email address as the requester (sender) email address.
             * @type {String}
             */
            custom_requester_email: undefined,
            /**
             * This parameter is used to specify a custom completion redirect URL.
             * If empty the default Post-Sign Completion URL of the current Business will be used
             * @type {String}
             */
            redirect: undefined,
            /**
             * This parameter is used to specify a custom decline redirect URL.
             * If empty the default Post-Sign Decline URL of the current Business will be used
             * @type {String}
             */
            redirect_decline: undefined,
            /**
             * This parameter is used to specify an internal reference for your application,
             * such as an identification string of the server or client making the API request.
             */
            client: string,
            /**
             * Expiration Time of the Document, default expiration time will be used if unset
             */
            expires: Date,
            /**
             * Array of Signer Objects which are associated with the Document
             */
            signers: Signer[],
            /**
             * Array of Recipient Objects which are associated with the Document
             */
            recipients: Recipient[],
            /**
             * This object must contain a sub array for each Merge Field of this template.
             */
            fields: Field[],
            /**
             * Wheter the document has embedded/iframe signing enabled
             */
            embeddedSigningEnabled: boolean,
        }
    }

    export = DocumentTemplate
}

declare module 'eversign/lib/DropdownField' {
    class DropdownField {

    }

    export = DropdownField
}

declare module 'eversign/lib/Field' {
    class Field {
        constructor(newField?: Field.IObject)
        getIdentifier(): string
        getValue(): string
        setIdentifier(identifier: string): void
        setValue(value: string): void
        toObject(): Field & Field.IObject
    }
    namespace Field {
        interface IObject {
            /**
             * The field's Field Identifier.
             */
            identifier: string,
            /**
             * The field's value.
             */
            value: string
        }
    }

    export = Field
}

declare module 'eversign/lib/File' {
    class File {
        constructor(newFile?: Partial<File.IObject>)
        getFileId(): string
        getName(): string
        getPages(): number
        getTotalPages(): number
        getFileUrl(): string
        getFileBase64(): string
        getFilePath(): string
        clearFileFields(): void
        setFileId(id: string): void
        setFilePath(path: string): void
        setName(name: string): void
        toObject(): File.IObject
    }
    namespace File {
        interface IObject {
            /**
             * Unique ID of the uploaded file
             */
            fileId: string,

            /**
             * A URL leading to the file you would like to upload as your document file.
             */
            fileUrl: string,

            /**
             * Specify a base64 string of the file you would like to upload.
             */
            fileBase64: string,

            /**
             * Name of the file
             */
            name: string,

            /**
             * The number of pages of the File
             */
            pages: number,

            /**
             * The number of pages of the converted File
             */
            totalPages: number,

            /**
             * Setting this Property will upload the File as soon as createDocument
             * or uploadFile on the Client is called. Cannot be used in conjuction with other
             * File Links or Ids. After the Upload the fileId will be set automatically
             */
            filePath: string,
        }
    }

    export = File
}

declare module 'eversign/lib/FormField' {
    class FormField {
        generateType()
        getFileInde(): FormField.IObject['fileIndex']
        getHeight(): FormField.IObject['height']
        getIdentifier(): FormField.IObject['identifier']
        getPage(): FormField.IObject['page']
        getWidth(): FormField.IObject['width']
        getX(): FormField.IObject['x']
        getY(): FormField.IObject['y']
        setFileIndex(fileIndex: FormField.IObject['fileIndex']): void
        setHeight(height: FormField.IObject['height']): void
        setIdentifier(identifier: FormField.IObject['identifier']): void
        setPage(page: FormField.IObject['page']): void
        setWidth(width: FormField.IObject['width']): void
        setX(x: FormField.IObject['x']): void
        setY(y: FormField.IObject['y']): void
        toObject(): FormField & FormField.IObject
        validate(): boolean
    }
    namespace FormField {
        enum TYPE {
            SIGNATURE = 'signature',
            ATTACHMENT = 'attachment',
            NOTE = 'note',
            RADIO = 'radio',
            TEXT = 'text',
            DROPDOWN = 'dropdown',
            DATE_SIGNED = 'date_signed',
            INITIALS = 'initials',
            CHECKBOX = 'checkbox',
        }
        interface IObject {
            /**
             * A unique alphanumeric identifier which distinguishes the different form
             * fields from another
             */
            identifier: string,

            /**
             * The number of the page where the FormField should be displayed
             */
            page: number,

            /**
             * The height of the FormField in pixels.
             */
            width: number,

            /**
             * The height of the FormField in pixels.
             */
            height: number,

            /**
             * The FormField's horizontal margin from the left
             * side of the document in pixels.
             */
            x: number,

            /**
             * The FormField's vertical margin from the top of the document in pixels
             */
            y: number,

            /**
             * The FormField's file index on which it will be placed
             */
            fileIndex: number,

            /**
             *
             */
            type: TYPE
        }
    }

    export = FormField
}

declare module 'eversign/lib/InitialsField' {
    class InitialsField {

    }

    export = InitialsField
}

declare module 'eversign/lib/NoteField' {
    import FormField = require('eversign/lib/FormField')
    import TextFormField = require('eversign/lib/TextFormField')
    import Readable = require('eversign/lib/Readable')
    import Requireable = require('eversign/lib/Requireable')
    import Signable = require('eversign/lib/Signable')

    class NoteField {
        constructor(newNoteField?: Partial<NoteField.IObject>)
        getName(): NoteField.IObject['name']
        getValidationType(): NoteField.IObject['validationType']
        getValue(): NoteField.IObject['value']
        setName(name: NoteField.IObject['name']): void
        setValidationType(value: NoteField.IObject['validationType']): void
        setValue(value: NoteField.IObject['value']): void
        toObject(): NoteField & NoteField.IObject
    }
    interface NoteField extends FormField, TextFormField, Readable, Requireable, Signable {}  // Typescript way of typing mixins.
    namespace NoteField {
        interface IObject extends FormField.IObject, TextFormField.IObject, Readable.IObject, Requireable.IObject, Signable.IObject {
            /**
             * The label of the Field
             */
            name: string,

            /**
             * Specify text content to pre-fill field.
             */
            value: string,

            /**
             * Enable Field Validation for this field. Available validation types are email_address, letters_only and numbers_only.
             */
            validationType: string
        }
    }

    export = NoteField
}

declare module 'eversign/lib/RadioField' {
    class RadioField {

    }

    export = RadioField
}

declare module 'eversign/lib/Recipient' {
    class Recipient {

    }

    export = Recipient
}

declare module 'eversign/lib/Request' {
    class Request {

    }

    export = Request
}

declare module 'eversign/lib/SignatureField' {
    import FormField = require('eversign/lib/FormField')
    import Requireable = require('eversign/lib/Requireable')
    import Signable = require('eversign/lib/Signable')

    class SignatureField {
        constructor(newNoteField?: Partial<SignatureField.IObject>)
        toObject(): SignatureField & SignatureField.IObject
    }
    interface SignatureField extends FormField, Requireable, Signable {}
    namespace SignatureField {
        interface IObject extends FormField.IObject, Requireable.IObject, Signable.IObject {
        }
    }

    export = SignatureField
}

declare module 'eversign/lib/Signer' {
    class Signer {
        constructor(signerObject?: Partial<Signer.IObject>)
        getDeclined(): boolean
        getDeliverEmail(): boolean
        getEmail(): string
        getEmbeddedSigningUrl(): string
        getId(): number
        getLanguage(): string
        getMessage(): string
        getName(): string
        getOrder(): number
        getPin(): number
        getRole(): string
        getRequired(): boolean
        getSent(): boolean
        getSigned(): boolean
        getSignedTimestamp(): number
        getSignerAuthenticationSmsEnabled(): boolean
        getSignerAuthenticationPhoneNumber(): string
        getSigningUrl(): string
        getStatus(): Signer.STATUS
        getViewed(): boolean
        setDeclined(newDeclined: boolean): void
        setDeliverEmail(newDeliverEmail: string): void
        setEmail(newEmail: string): void
        setEmbeddedSigningUrl(newEmbeddedSigningUrl: string): void
        setId(newId: number): void
        setLanguage(newLanguage: string): void
        setMessage(newMessage: string): void
        setName(newName: string): void
        setOrder(newOrder: number): void
        setPin(newPin: number): void
        setRole(newRole: string): void
        setRequired(newRequired: boolean): void
        setSent(newSent: boolean): void
        setSigned(newSigned: boolean): void
        setSignedTimestamp(newSignedTimstamp: number): void
        setSignerAuthenticationPhoneNumber(newSignerAuthenticationPhoneNumber: string): void
        setSignerAuthenticationSmsEnabled(newSignerAuthenticationSmsEnabled: string): void
        setSigningUrl(newSigningUrl: string): void
        setStatus(newStatus: Signer.STATUS): void
        setViewed(newViewed: boolean): void
        toObject(): Signer & Signer.IObject
    }
    namespace Signer {
        enum STATUS {
            /**
             * Signer has declined to sign
             */
            DECLINED = 'declined',
            /**
             * Signer has signed
             */
            SIGNED = 'signed',
            /**
             * Signer has not signed yet
             */
            WAITING_FOR_SIGNATURE = 'waiting_for_signature',
            /**
             * Document delivery is queued (waiting for other signers to sign)
             */
            ON_HOLD = 'on_hold',
        }
        interface IObject {
            /**
             * Sets the id of the Signer.
             */
            id: number,
            /**
             * The order number of the Signer
             * Usually starts with 1 for the first Signer.
             */
            order: number,
            /**
             * Sets the full name of the Signer.
             */
            name: string,
            /**
             * Sets the email of the Email.
             */
            email: string,
            /**
             * Roles are used when creating a document from a template.
             * Please note that all required roles must be specified in order to use a template.
             */
            role: string,
            /**
             * Returns 1 if this signing role is required (Templates only).
             */
            required: boolean,
            /**
             * Pins are used as an extra level of security and must be put in
             * by the signer before signing the Document.
             */
            pin: number,
            /**
             * True if the Signer has signed the associated Document
             */
            signed: boolean,
            /**
             * Time of signing the Document if the Signer has signed already
             */
            signedTimestamp: number,
            /**
             * True if the Signer declined to sign the Document
             */
            declined: boolean,
            /**
             * True if the Document has been sent to the Signer
             */
            sent: boolean,
            /**
             * True if the Document has been viewed to the Signer
             */
            viewed: boolean,
            /**
             * URL of the Signing Request that is sent to the Signer
             */
            signingUrl: string,
            /**
             * Status of the Signer
             */
            status: STATUS,
            /**
             * the embedded/iframe signing url
             */
            embeddedSigningUrl: string,
            /**
             * This parameter is only applicable if embedded_signing_enabled is set to 1.
             * When this parameter is set, embedded document signers will be notified by email.
             */
            deliverEmail: boolean,
            /**
             * This parameter is used to specify if signer authentication by SMS is enabled.
             */
            signerAuthenticationSmsEnabled: boolean,       
            /**
             * If signer authentication by SMS is enabled, this parameter is used to specify the phone number to which SMS validation will be delivered. ITU call prefix can start both with 00 or + sign.
             */
            signerAuthenticationPhoneNumber: string,
            /**
             * This parameter can be used to specify a custom message (upon document delivery) for the current signer. Please note that for the current signer the general document message will be overriden by this parameter. 
             */
            message: string,
            /**
             * This parameter is used to specify the language in which signing notifications (emails), the document status page and the signature process will appear for this signer. 
             */
            language: undefined,
        }
    }

    export = Signer
}

declare module 'eversign/lib/TextField' {
    import NoteField = require('eversign/lib/NoteField')
    class TextField {
        constructor(newTextField?: Partial<TextField.IObject>)
    }
    interface TextField extends NoteField {}
    namespace TextField {
        interface IObject extends NoteField.IObject {
        }
    }

    export = TextField
}

declare module 'eversign/lib/TextFormField' {
    import FormField = require('eversign/lib/FormField')

    class TextFormField extends FormField {
        constructor(newTextFormField?: TextFormField.IObject)
        getTextColor(): TextFormField.IObject['textColor']
        getTextFont(): TextFormField.IObject['textFont']
        getTextSize(): TextFormField.IObject['textSize']
        getTextStyle(): TextFormField.IObject['textStyle']
        setTextColor(textColor: TextFormField.IObject['textColor']): void
        setTextFont(textFont: TextFormField.IObject['textFont']): void
        setTextSize(textSize: TextFormField.IObject['textSize']): void
        setTextStyle(textStyle: TextFormField.IObject['textStyle']): void
        toObject(): TextFormField & TextFormField.IObject
        validate(): boolean
    }
    namespace TextFormField {
        enum FONTS {
            ARIAL = 'arial',
            CALIBRI = 'calibri',
            COURIER_NEW = 'courier_new',
            HELVETICA = 'helvetica',
            GEORGIA = 'georgia',
            TIMES_NEW_ROMAN = 'times_new_roman',
        }
        enum STYLE {
            NORMAL = ' ',
            BOLD = 'B',
            ITALIC = 'I',
            UNDERLINED = 'U',
            BOLD_ITALIC = 'BI',
            BOLD_UNDERLINED = 'BU',
            ITALIC_UNDERLINED = 'IU',
            BOLD_ITALIC_UNDERLINED = 'BIU',
        }
        interface IObject extends FormField.IObject {
            /**
             * Set to your preferred font size number
             */
            textSize: number,

            /**
             * Color of the Text as Hex color code, e.g. #003399
             */
            textColor: string,

            /**
             * Font of the TextFormField
             * Supported fonts are: arial, calibri, courier_new, helvetica, georgia
             * and times_new_roman
             */
            textFont: FONTS,

            /**
             * Text Style of the TextFormField
             * The letters B for bold, U for underlined and I for italic,
             * in an order of your choice. Example: BUI
             */
            textStyle: STYLE,
        }
    }

    export = TextFormField
}

declare module 'eversign/lib/OAuthTokenRequest' {
    class OAuthTokenRequest {

    }

    export = OAuthTokenRequest
}

declare module 'eversign/lib/Readable' {
    class Readable {
        getreadOnly(): Readable.IObject['readOnly']
        setReadOnly(readOnly: Readable.IObject['readOnly']): void
    }
    namespace Readable {
        interface IObject {
            /**
             * Main readable object
             */
            readOnly: boolean
        }
    }

    export = Readable
}

declare module 'eversign/lib/Requireable' {
    class Requireable {
        getRequired(): Requireable.IObject['required']
        setRequired(required: Requireable.IObject['required']): void
    }
    namespace Requireable {
        interface IObject {
            /**
             * Set if the SignatureField is required or not.
             */
            required: boolean
        }
    }

    export = Requireable
}

declare module 'eversign/lib/Signable' {
    class Signable {
        getSigner(): Signable.IObject['signer']
        setSigner(signer: Signable.IObject['signer']): void
    }
    namespace Signable {
        interface IObject {
            /**
             *
             */
            signer: number
        }
    }

    export = Signable
}

declare module 'eversign/lib/LogEntry' {
    class LogEntry {
        constructor(newLogEntry: LogEntry)
        getEvent(): LogEntry.LOG_EVENT
        getSigner(): string
        getTimestamp(): Date
    }
    namespace LogEntry {
        enum LOG_EVENT {
            /**
             * Document has been created.
             */
            DOCUMENT_CREATED = 'document_created',
            /**
             * Document has been edited.
             */
            DOCUMENT_EDITED = 'document_edited',
            /**
             * Document has been completed.
             */
            DOCUMENT_COMPLETED = 'document_completed',
            /**
             * Document has been sent.
             */
            DOCUMENT_SENT = 'document_sent',
            /**
             * Document has been restored from trash.
             */
            DOCUMENT_RESTORED = 'document_restored',
            /**
             * Document has been cancelled.
             */
            DOCUMENT_CANCELLED = 'document_cancelled',
            /**
             * Document has been trashed.
             */
            DOCUMENT_TRASHED = 'document_trashed',
            /**
             * Document has been archived.
             */
            DOCUMENT_ARCHIVED = 'document_archived',
            /**
             * Document has been unarchived.
             */
            DOCUMENT_UNARCHIVED = 'document_unarchived',
            /**
             * Document has been deleted.
             */
            DOCUMENT_DELETED = 'document_deleted',
            /**
             * Document has expired.
             */
            DOCUMENT_EXPIRED = 'document_expired',
            /**
             * Document has been opened/viewed.
             */
            DOCUMENT_VIEWED = 'document_viewed',
            /**
             * Document has been declined.
             */
            DOCUMENT_DECLINED = 'document_declined',
            /**
             * Document has been signed by a signer.
             */
            DOCUMENT_SIGNED = 'document_signed',

        }
        interface IObject {
            /**
             * The event that occurred
             */
            event: LOG_EVENT,

            /**
             * The id of the Signer, that triggered the event
             * Can be set to 0 if there was no signer involved i.e. document_create
             */
            signer: number,

            /**
             * The Date when the event occurred
             *
             * @type {Date}
             */
            timestamp: Date,
        }
    }

    export = LogEntry
}

