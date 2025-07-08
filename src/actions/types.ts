export type ActionResult<T> = { success: boolean; data?: T; error?: { code: string; message: string; fieldErrors?: Record<string, string> } }
