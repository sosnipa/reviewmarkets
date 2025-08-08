import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { isRead, isReplied, reply, repliedAt } = body;

    const updateData: any = {};

    if (typeof isRead === 'boolean') {
      updateData.isRead = isRead;
    }

    if (typeof isReplied === 'boolean') {
      updateData.isReplied = isReplied;
    }

    if (reply) {
      updateData.reply = reply;
    }

    if (repliedAt) {
      updateData.repliedAt = new Date(repliedAt);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'At least one field must be provided' }, { status: 400 });
    }

    const updatedContact = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      contact: updatedContact,
    });
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ error: 'Failed to update contact message' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ error: 'Failed to delete contact message' }, { status: 500 });
  }
}
