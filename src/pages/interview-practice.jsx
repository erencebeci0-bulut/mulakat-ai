import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SEOHead from '../components/SEOHead';
import InterviewStartForm from '../components/InterviewStartForm';
import InterviewQuestion from '../components/InterviewQuestion';
import AnswerInput from '../components/AnswerInput';
import InterviewResult from '../components/InterviewResult';
import { startInterviewSession, fetchInterviewQuestions, submitAnswer, completeInterview } from '../services/interviewService';

export default function InterviewPracticePage() {
    const [searchParams] = useSearchParams();
    const defaultRole = searchParams.get('role') || '';
    const defaultCompany = searchParams.get('company') || '';

    // Flow State: 'setup' -> 'interviewing' -> 'results'
    const [step, setStep] = useState('setup');
    const [isLoading, setIsLoading] = useState(false);

    // Context State
    const [sessionId, setSessionId] = useState(null);
    const [role, setRole] = useState(defaultRole);
    const [company, setCompany] = useState(defaultCompany);

    // Interviewing State
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Results State
    const [finalReport, setFinalReport] = useState(null);

    // Auto-start side effect
    useEffect(() => {
        if (defaultRole && step === 'setup') {
            handleStart({ role: defaultRole, company: defaultCompany });
        }
    }, []);

    const handleStart = async ({ role: selectedRole, company: selectedCompany }) => {
        setIsLoading(true);
        try {
            setRole(selectedRole);
            setCompany(selectedCompany);

            // 1. Start Session
            const sessionRes = await startInterviewSession({ role: selectedRole, company: selectedCompany });
            setSessionId(sessionRes.session_id);

            // 2. Fetch Questions
            const qs = await fetchInterviewQuestions({ role: selectedRole, company: selectedCompany });
            setQuestions(qs);
            setStep('interviewing');
            setCurrentIdx(0);
        } catch (error) {
            console.error("Failed to start session:", error);
            alert("Mülakat başlatılamadı. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerSubmit = async (answerText) => {
        setIsSubmitting(true);
        const currentQ = questions[currentIdx];

        try {
            // Submit single answer
            const evaluation = await submitAnswer({
                session_id: sessionId,
                question_id: currentQ.id,
                answer_text: answerText
            });

            // Keep track of given answers locally (optional)
            setAnswers([...answers, { question: currentQ, answer: answerText, evaluation }]);

            // Check if we reached the final question
            if (currentIdx + 1 >= questions.length) {
                // Complete entire session
                setIsLoading(true);
                const completeRes = await completeInterview({ session_id: sessionId });
                setFinalReport(completeRes);
                setStep('results');
            } else {
                // Move to next question
                setCurrentIdx(currentIdx + 1);
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            alert("Cevabınız gönderilirken bir hata oluştu.");
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <SEOHead
                title={`${role || 'Genel'} - AI Mülakat Pratiği | mulakatim.com`}
                description="Yapay zeka ile sektörel mülakat simülasyonu yapın. Puanınızı ve detaylı analiz raporunuzu hemen görüntüleyin."
            />
            <NavBar />

            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
                {/* 1. SETUP FLOW */}
                {step === 'setup' && (
                    <div className="animate-in">
                        {isLoading ? (
                            <div className="card glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                                <div className="loading-pulse" style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>
                                    Mülakat Oturumu Hazırlanıyor...
                                </div>
                            </div>
                        ) : (
                            <InterviewStartForm
                                initialRole={role}
                                initialCompany={company}
                                onStart={handleStart}
                            />
                        )}
                    </div>
                )}

                {/* 2. INTERVIEWING FLOW */}
                {step === 'interviewing' && questions.length > 0 && !finalReport && (
                    <div className="animate-in">
                        <div className="progress-bar" style={{ marginBottom: '32px', background: 'var(--bg-secondary)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                            <div className="progress-fill" style={{ width: `${((currentIdx) / questions.length) * 100}%`, background: 'var(--accent)', height: '100%', transition: 'width 0.3s ease' }} />
                        </div>

                        <InterviewQuestion
                            question={questions[currentIdx]}
                            currentIdx={currentIdx}
                            total={questions.length}
                        />

                        <AnswerInput
                            onSubmit={handleAnswerSubmit}
                            isSubmitting={isSubmitting || isLoading}
                        />
                    </div>
                )}

                {/* 3. RESULTS FLOW */}
                {step === 'results' && finalReport && (
                    <div className="animate-in">
                        <InterviewResult report={finalReport} />
                    </div>
                )}
            </div>
        </div>
    );
}
