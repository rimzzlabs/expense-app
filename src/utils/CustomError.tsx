import { ApiError, PostgrestError } from '@supabase/supabase-js'

export class CustomError extends Error {
  constructor(payload: ApiError | PostgrestError | Error) {
    super(payload.message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
