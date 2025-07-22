import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const city = searchParams.get('city')
    const date = searchParams.get('date')
    const comedian = searchParams.get('comedian')

    let query = supabase
      .from('shows')
      .select(`
        *,
        venue:venues(*),
        performers:show_performers(
          *,
          comedian:comedians(*)
        )
      `)
      .gte('show_date', new Date().toISOString())
      .eq('status', 'upcoming')
      .order('show_date')
      .range(offset, offset + limit - 1)

    if (city) {
      query = query.eq('venue.city', city)
    }

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 1)
      query = query
        .gte('show_date', startDate.toISOString())
        .lt('show_date', endDate.toISOString())
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filter by comedian if specified
    let filteredData = data
    if (comedian && data) {
      filteredData = data.filter((show: any) =>
        show.performers?.some((p: any) =>
          p.comedian?.name.toLowerCase().includes(comedian.toLowerCase())
        )
      )
    }

    return NextResponse.json({ data: filteredData, count: filteredData?.length || 0 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}