import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ tags, onTagsChange, placeholder }) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim().replace(/^,|,$/g, '');
            if (newTag && !tags.includes(newTag)) {
                onTagsChange([...tags, newTag]);
            }
            setInputValue('');
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            onTagsChange(tags.slice(0, -1));
        }
    };

    const removeTag = (indexToRemove) => {
        onTagsChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="input" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px', minHeight: '44px', height: 'auto' }}>
            {tags.map((tag, index) => (
                <div key={index} style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    backgroundColor: 'var(--accent-glow)', color: 'var(--text-primary)',
                    padding: '4px 8px', borderRadius: '6px', fontSize: '13px', border: '1px solid rgba(108,99,255,0.3)'
                }}>
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        <X size={14} />
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ''}
                style={{ border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)', flex: 1, minWidth: '120px', fontSize: '14px' }}
            />
        </div>
    );
}
