
import { Data } from "effect"

export class NoOwner {
    readonly _tag = 'NoOwner'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class DeserializationError {
    readonly _tag = 'DeserializationError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }

}

export class AccountSignatureError {
    readonly _tag = 'AccountSignatureError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }

}

export class TransactionFetchError {
    readonly _tag = 'TransactionFetchError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class TransactionGenerationError {
    readonly _tag = 'TransactionGenerationError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class TransactionSubmissionError {
    readonly _tag = 'TransactionSubmissionError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }

}

export class TrasnactionError {
    readonly _tag = 'TransactionError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}


export class UnknownTransactionError {
    readonly _tag = 'UnknownTransactionError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class TransactionFailedError {
    readonly _tag = 'TransactionFailedError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}
export class UnknownError {
    readonly _tag = 'UnknownError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class EmptyError {
    readonly _tag = 'EmptyError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class FetchError {
    readonly _tag = 'FetchError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class DecryptionError {
    readonly _tag = 'DecryptionError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class EncryptionError {
    readonly _tag = 'EncryptionError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class NoPrivateKeyError {
    readonly _tag = 'NoPrivateKeyError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class NoPublicKeyError {
    readonly _tag = 'NoPublicKeyError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class InboxNotFoundError {
    readonly _tag = 'InboxNotFoundError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class BuildTransactionError {
    readonly _tag = 'BuildTransactionError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class DelegateFetchError {
    readonly _tag = 'DelegateFetchError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToGenerateSharedSecret {
    readonly _tag = 'UnableToGenerateSharedSecret'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToStoreInboxHeaders {
    readonly _tag = 'UnableToStoreInboxHeaders'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToStoreDelegate {
    readonly _tag = 'UnableToStoreDelegate'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToEncryptMessage {
    readonly _tag = 'UnableToEncryptMessage_'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToSerializeBroadCast {
    readonly _tag = 'UnableToSerializeBroadCast'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class MessageNotFoundError {
    readonly _tag = 'MessageNotFoundError'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToGetUsername {
    readonly _tag = 'UnableToGetUsername'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class UnableToFetchDelegateStatus {
    readonly _tag = 'UnableToFetchDelegateStatus'
    initialError: any
    constructor(error?: any) {
        this.initialError = error
    }
}

export class PetraConnectionRejected extends Data.TaggedError("PetraConnectionRejected")<{
    initialError: any
}> { }

export class NoPrivateKeyFound extends Data.TaggedError("NoPrivateKeyFound")<{
    initialError: any
}> { }


export class UnableToDeserializePetraResponse extends Data.TaggedError("UnableToDeserializePetraResponse")<{
    initialError: any
}> { }

export class UnableToGeneratePetraSharedSecret extends Data.TaggedError("UnableToGeneratePetraSharedSecret")<{
    initialError: any
}> { }

export class UnableToStorePetraSharedSecret extends Data.TaggedError("UnableToStorePetraSharedSecret")<{
    initialError: any
}> { }

export class NoPrivateKey extends Data.TaggedError("NoPrivateKey")<{
    initialError: any
}> { }