import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Dynamically import docx so it doesn't block initial load if not needed
// but for simplicity we can import directly:
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

export const exportToPDF = async (elementId, filename = 'cv.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
    } catch (err) {
        console.error('PDF export failed', err);
    }
};

export const exportToDOCX = async (cvData, filename = 'cv.docx') => {
    const children = [];

    // Header
    children.push(new Paragraph({
        text: cvData.personal.name || 'Ad Soyad',
        heading: HeadingLevel.HEADING_1
    }));
    if (cvData.personal.title) {
        children.push(new Paragraph({ text: cvData.personal.title, heading: HeadingLevel.HEADING_2 }));
    }

    // Contact Info
    const contactInfo = [
        cvData.personal.email,
        cvData.personal.phone,
        cvData.personal.location,
        cvData.personal.linkedin,
        cvData.personal.portfolio
    ].filter(Boolean).join(' | ');

    if (contactInfo) {
        children.push(new Paragraph({ text: contactInfo }));
    }

    children.push(new Paragraph({ text: '' })); // Spacing

    // Summary
    if (cvData.summary) {
        children.push(new Paragraph({ text: 'Profesyonel Özet', heading: HeadingLevel.HEADING_3 }));
        children.push(new Paragraph({ text: cvData.summary }));
        children.push(new Paragraph({ text: '' }));
    }

    // Experience
    if (cvData.experience.length > 0 && cvData.experience[0].company) {
        children.push(new Paragraph({ text: 'İş Deneyimi', heading: HeadingLevel.HEADING_3 }));
        cvData.experience.forEach(exp => {
            if (!exp.company) return;
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: exp.position, bold: true }),
                    new TextRun(` at ${exp.company} (${exp.dates})`)
                ]
            }));
            if (exp.desc) {
                children.push(new Paragraph({ text: exp.desc }));
            }
            children.push(new Paragraph({ text: '' }));
        });
    }

    // Education
    if (cvData.education.length > 0 && cvData.education[0].school) {
        children.push(new Paragraph({ text: 'Eğitim Bilgileri', heading: HeadingLevel.HEADING_3 }));
        cvData.education.forEach(edu => {
            if (!edu.school) return;
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: edu.school, bold: true }),
                    new TextRun(` - ${edu.degree} (${edu.year})`)
                ]
            }));
        });
        children.push(new Paragraph({ text: '' }));
    }

    // Skills
    if (cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0 || cvData.skills.languages.length > 0) {
        children.push(new Paragraph({ text: 'Yetenekler', heading: HeadingLevel.HEADING_3 }));
        if (cvData.skills.technical.length > 0) {
            children.push(new Paragraph({ text: `Teknik: ${cvData.skills.technical.join(', ')}` }));
        }
        if (cvData.skills.soft.length > 0) {
            children.push(new Paragraph({ text: `Sosyal: ${cvData.skills.soft.join(', ')}` }));
        }
        if (cvData.skills.languages.length > 0) {
            children.push(new Paragraph({ text: `Diller: ${cvData.skills.languages.join(', ')}` }));
        }
    }

    const doc = new Document({
        sections: [{ properties: {}, children }],
    });

    try {
        const buffer = await Packer.toBlob(doc);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(buffer);
        link.download = filename;
        link.click();
    } catch (err) {
        console.error('DOCX export failed', err);
    }
};

export const exportToTXT = (cvData, filename = 'cv.txt') => {
    let content = `${cvData.personal.name || 'Ad Soyad'}\n`;
    if (cvData.personal.title) content += `${cvData.personal.title}\n`;
    content += `İletişim: ${[cvData.personal.email, cvData.personal.phone, cvData.personal.location].filter(Boolean).join(' | ')}\n\n`;

    if (cvData.summary) {
        content += `PROFESYONEL ÖZET\n`;
        content += `${cvData.summary}\n\n`;
    }

    if (cvData.experience.length > 0 && cvData.experience[0].company) {
        content += `İŞ DENEYİMİ\n`;
        cvData.experience.forEach(exp => {
            if (!exp.company) return;
            content += `${exp.position} | ${exp.company} (${exp.dates})\n`;
            if (exp.desc) content += `${exp.desc}\n`;
            content += `\n`;
        });
    }

    if (cvData.education.length > 0 && cvData.education[0].school) {
        content += `EĞİTİM BİLGİLERİ\n`;
        cvData.education.forEach(edu => {
            if (!edu.school) return;
            content += `${edu.school} - ${edu.degree} (${edu.year})\n`;
        });
        content += `\n`;
    }

    if (cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0 || cvData.skills.languages.length > 0) {
        content += `YETENEKLER\n`;
        if (cvData.skills.technical.length > 0) content += `Teknik: ${cvData.skills.technical.join(', ')}\n`;
        if (cvData.skills.soft.length > 0) content += `Sosyal: ${cvData.skills.soft.join(', ')}\n`;
        if (cvData.skills.languages.length > 0) content += `Diller: ${cvData.skills.languages.join(', ')}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

export const exportToMarkdown = (cvData, filename = 'cv.md') => {
    let content = `# ${cvData.personal.name || 'Ad Soyad'}\n`;
    if (cvData.personal.title) content += `### ${cvData.personal.title}\n\n`;

    content += `> ${[cvData.personal.email, cvData.personal.phone, cvData.personal.location].filter(Boolean).join(' | ')}\n\n`;

    if (cvData.summary) {
        content += `## Profesyonel Özet\n${cvData.summary}\n\n`;
    }

    if (cvData.experience.length > 0 && cvData.experience[0].company) {
        content += `## İş Deneyimi\n`;
        cvData.experience.forEach(exp => {
            if (!exp.company) return;
            content += `### **${exp.position}** at ${exp.company} \n*${exp.dates}*\n\n`;
            if (exp.desc) content += `${exp.desc}\n\n`;
        });
    }

    if (cvData.education.length > 0 && cvData.education[0].school) {
        content += `## Eğitim Bilgileri\n`;
        cvData.education.forEach(edu => {
            if (!edu.school) return;
            content += `- **${edu.school}** - ${edu.degree} (*${edu.year}*)\n`;
        });
        content += `\n`;
    }

    if (cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0 || cvData.skills.languages.length > 0) {
        content += `## Yetenekler\n`;
        if (cvData.skills.technical.length > 0) content += `- **Teknik:** ${cvData.skills.technical.join(', ')}\n`;
        if (cvData.skills.soft.length > 0) content += `- **Sosyal:** ${cvData.skills.soft.join(', ')}\n`;
        if (cvData.skills.languages.length > 0) content += `- **Diller:** ${cvData.skills.languages.join(', ')}\n`;
    }

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

export const exportToJSON = (cvData, filename = 'cv.json') => {
    const content = JSON.stringify(cvData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
