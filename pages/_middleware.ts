import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('middle ware', req.nextUrl.pathname)

  return NextResponse.next()
}
