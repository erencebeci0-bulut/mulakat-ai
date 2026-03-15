export async function startInterviewSession({ role, company }) {
    try {
        const response = await fetch('/api/interview/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role, company }),
        });
        if (!response.ok) throw new Error('Failed to start session');
        return await response.json();
    } catch (error) {
        console.warn('Backend unavailable, using MVP simulation fallback.');
        return {
            session_id: `mock-session-${Date.now()}`,
            role,
            company,
            status: 'started'
        };
    }
}

export async function fetchInterviewQuestions({ role, company }) {
    try {
        const url = new URL('/api/interview/questions', window.location.origin);
        if (role) url.searchParams.append('role', role);
        if (company) url.searchParams.append('company', company);

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch questions');
        return await response.json();
    } catch (error) {
        console.warn('Backend unavailable, using MVP mock questions.');
        return [
            { id: 'q1', question_text: `${company ? company + ' şirketinde ' : ''}${role} pozisyonu için neden uygun olduğunuzu düşünüyorsunuz?`, difficulty_level: 2 },
            { id: 'q2', question_text: 'Şimdiye kadar çözdüğünüz en zor problem neydi ve nasıl yaklaştınız?', difficulty_level: 4 },
            { id: 'q3', question_text: 'Takım içinde yaşadığınız bir anlaşmazlığı nasıl çözdüğünüze dair bir örnek verir misiniz?', difficulty_level: 3 },
        ];
    }
}

export async function submitAnswer({ session_id, question_id, answer_text }) {
    try {
        const response = await fetch('/api/interview/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id, question_id, answer_text }),
        });
        if (!response.ok) throw new Error('Failed to submit answer');
        return await response.json();
    } catch (error) {
        // Mock instant score breakdown & fallback
        return {
            success: true,
            score_breakdown: {
                clarity: Math.floor(Math.random() * 4) + 6,
                structure: Math.floor(Math.random() * 4) + 6,
                technical: Math.floor(Math.random() * 4) + 6,
                communication: Math.floor(Math.random() * 4) + 6,
            },
            feedback: "Bu cevap genel olarak yapısal bir bütünlüğe sahip. Ancak teknik detayları spesifik örneklerle desteklemeniz mülakatlarda sizi öne çıkaracaktır."
        };
    }
}

export async function completeInterview({ session_id }) {
    try {
        const response = await fetch('/api/interview/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id }),
        });
        if (!response.ok) throw new Error('Failed to complete interview');
        return await response.json();
    } catch (error) {
        // Mock final report payload
        return {
            overall_score: 8.2,
            score_breakdown: {
                clarity: 8.5,
                structure: 7.5,
                technical: 8.0,
                communication: 8.8
            },
            strengths: [
                "Net ve anlaşılır iletişim kurabiliyorsunuz.",
                "Süreci adım adım kurgulama yeteneğiniz güçlü."
            ],
            weaknesses: [
                "Teknik terimleri kullanırken bağlamı daha iyi açıklayabilirsiniz.",
                "Verdiğiniz örnekler bazen yüzeysel kalabiliyor."
            ],
            ai_summary: "Genel olarak başarılı bir mülakat performansı sergilediniz. Özgüvenli yapınız ve sorun çözme odaklı mizaçınız oldukça ikna ediciydi."
        };
    }
}
