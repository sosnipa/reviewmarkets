import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// PUT - Update template
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, subject, content, type, isActive } = body;
    const { id } = params;

    // Validate required fields
    if (!name || !subject || !content || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if template exists
    const existingTemplate = await prisma.emailTemplate.findUnique({
      where: { id },
    });

    if (!existingTemplate) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    // Check if new name conflicts with another template
    const nameConflict = await prisma.emailTemplate.findFirst({
      where: {
        name,
        id: { not: id },
      },
    });

    if (nameConflict) {
      return NextResponse.json({ error: 'Template name already exists' }, { status: 400 });
    }

    const template = await prisma.emailTemplate.update({
      where: { id },
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
    console.error('Error updating template:', error);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}

// DELETE - Delete template
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Check if template exists
    const existingTemplate = await prisma.emailTemplate.findUnique({
      where: { id },
    });

    if (!existingTemplate) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    await prisma.emailTemplate.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
  }
}
