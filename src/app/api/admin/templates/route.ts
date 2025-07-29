import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Fetch all templates
export async function GET() {
  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      templates,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

// POST - Create new template
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, subject, content, type, isActive } = body;

    // Validate required fields
    if (!name || !subject || !content || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if template name already exists
    const existingTemplate = await prisma.emailTemplate.findUnique({
      where: { name },
    });

    if (existingTemplate) {
      return NextResponse.json({ error: 'Template name already exists' }, { status: 400 });
    }

    const template = await prisma.emailTemplate.create({
      data: {
        name,
        subject,
        content,
        type,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}
