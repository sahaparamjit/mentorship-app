import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';

export async function POST(request: Request) {
  console.log('PDF generation started');
  
  try {
    const plan = await request.json();
    console.log('Received plan data:', plan);

    // Create new PDF document
    const doc = new jsPDF();
    
    // Add watermark
    doc.setTextColor(200, 200, 200); // Light gray color
    doc.setFontSize(40);
    doc.setFont('helvetica', 'italic');
    
    // Calculate center of page
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Add rotated text
    doc.text("MENTOR : "+plan.Mentor_Name.toUpperCase(), pageWidth/2, pageHeight/1.5, {
      align: 'center',
      angle: 45
    });
    
    // Reset text color and font for regular content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    // Helper function to add wrapped text
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return lines.length;
    };

    // Add content
    let yPosition = 20;
    
    // Title
    doc.setFontSize(16);
    doc.text('Weekly Plan', 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Content
    doc.setFontSize(12);
    
    // Mentor Name
    doc.setFont('helvetica', 'bold');
    doc.text('Mentor Name:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(plan.Mentor_Name || '', 60, yPosition);
    yPosition += 10;

    // Week Title
    doc.setFont('helvetica', 'bold');
    doc.text('Week Title:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(plan.Week_Title || '', 60, yPosition);
    yPosition += 15;

    // Java Topics
    doc.setFont('helvetica', 'bold');
    doc.text('Java Topics to Cover:', 20, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    const javaLines = addWrappedText(plan.Java_Topics_to_Cover || '', 20, yPosition, 170);
    yPosition += (javaLines * 7) + 10;

    // DSA Concepts
    doc.setFont('helvetica', 'bold');
    doc.text('DSA Concepts:', 20, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    const dsaLines = addWrappedText(plan.DSA_Concepts || '', 20, yPosition, 170);
    yPosition += (dsaLines * 7) + 10;

    // Leetcode Questions
    doc.setFont('helvetica', 'bold');
    doc.text('Leetcode Questions:', 20, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    const leetcodeLines = addWrappedText(plan.Leetcode_Questions || '', 20, yPosition, 170);
    yPosition += (leetcodeLines * 7) + 10;

    // Advice
    doc.setFont('helvetica', 'bold');
    doc.text('Advice for the Week:', 20, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    addWrappedText(plan.Advice_for_the_Week || '', 20, yPosition, 170);

    // Generate PDF as array buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    console.log('PDF buffer created, size:', pdfBuffer.length);

    // Return the PDF buffer
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="weekly-plan.pdf"`,
      },
    });

  } catch (error) {
    console.error('Route handler error:', error);
    
    // Properly type the error object
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF', 
        details: errorMessage,
        stack: errorStack
      },
      { status: 500 }
    );
  }
} 