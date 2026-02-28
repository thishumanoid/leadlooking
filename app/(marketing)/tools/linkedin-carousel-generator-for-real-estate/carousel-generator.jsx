'use client';

import { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { toPng } from 'html-to-image';

const PALETTES = [
  {
    id: 'forest',
    label: 'Forest',
    bg: '#1B4332',
    accent: '#2D6A4F',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    ctaBg: '#ffffff',
    ctaText: '#1B4332',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    bg: '#023E8A',
    accent: '#0077B6',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    ctaBg: '#ffffff',
    ctaText: '#023E8A',
  },
  {
    id: 'slate',
    label: 'Slate',
    bg: '#1E293B',
    accent: '#334155',
    text: '#F1F5F9',
    muted: 'rgba(241,245,249,0.55)',
    ctaBg: '#F1F5F9',
    ctaText: '#1E293B',
  },
  {
    id: 'wine',
    label: 'Wine',
    bg: '#6B2737',
    accent: '#9B2335',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.60)',
    ctaBg: '#FFF0F0',
    ctaText: '#6B2737',
  },
  {
    id: 'indigo',
    label: 'Indigo',
    bg: '#312E81',
    accent: '#4338CA',
    text: '#E0E7FF',
    muted: 'rgba(224,231,255,0.60)',
    ctaBg: '#E0E7FF',
    ctaText: '#312E81',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    bg: '#0F172A',
    accent: '#1E3A5F',
    text: '#E2E8F0',
    muted: 'rgba(226,232,240,0.55)',
    ctaBg: '#38BDF8',
    ctaText: '#0F172A',
  },
  {
    id: 'teal',
    label: 'Teal',
    bg: '#134E4A',
    accent: '#0F766E',
    text: '#CCFBF1',
    muted: 'rgba(204,251,241,0.60)',
    ctaBg: '#CCFBF1',
    ctaText: '#134E4A',
  },
  {
    id: 'amber',
    label: 'Amber',
    bg: '#78350F',
    accent: '#B45309',
    text: '#FEF3C7',
    muted: 'rgba(254,243,199,0.60)',
    ctaBg: '#FEF3C7',
    ctaText: '#78350F',
  },
  {
    id: 'rose',
    label: 'Rose',
    bg: '#881337',
    accent: '#BE123C',
    text: '#FFE4E6',
    muted: 'rgba(255,228,230,0.60)',
    ctaBg: '#FFE4E6',
    ctaText: '#881337',
  },
  {
    id: 'sage',
    label: 'Sage',
    bg: '#F1F5E8',
    accent: '#86A96B',
    text: '#2D3A1E',
    muted: '#6B7A55',
    ctaBg: '#2D3A1E',
    ctaText: '#F1F5E8',
  },
  {
    id: 'cream',
    label: 'Cream',
    bg: '#FFFBEB',
    accent: '#D97706',
    text: '#1C1917',
    muted: '#78716C',
    ctaBg: '#1C1917',
    ctaText: '#FFFBEB',
  },
  {
    id: 'lavender',
    label: 'Lavender',
    bg: '#EDE9FE',
    accent: '#7C3AED',
    text: '#2E1065',
    muted: '#6D28D9',
    ctaBg: '#2E1065',
    ctaText: '#EDE9FE',
  },
  {
    id: 'blush',
    label: 'Blush',
    bg: '#FFF1F2',
    accent: '#FB7185',
    text: '#4C0519',
    muted: '#9F1239',
    ctaBg: '#4C0519',
    ctaText: '#FFF1F2',
  },
  {
    id: 'sky',
    label: 'Sky',
    bg: '#E0F2FE',
    accent: '#0284C7',
    text: '#082F49',
    muted: '#0369A1',
    ctaBg: '#082F49',
    ctaText: '#E0F2FE',
  },
  {
    id: 'charcoal',
    label: 'Charcoal',
    bg: '#27272A',
    accent: '#52525B',
    text: '#F4F4F5',
    muted: 'rgba(244,244,245,0.55)',
    ctaBg: '#F4F4F5',
    ctaText: '#27272A',
  },
  {
    id: 'violet',
    label: 'Violet',
    bg: '#4C1D95',
    accent: '#6D28D9',
    text: '#EDE9FE',
    muted: 'rgba(237,233,254,0.60)',
    ctaBg: '#EDE9FE',
    ctaText: '#4C1D95',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    bg: '#064E3B',
    accent: '#059669',
    text: '#D1FAE5',
    muted: 'rgba(209,250,229,0.60)',
    ctaBg: '#D1FAE5',
    ctaText: '#064E3B',
  },
  {
    id: 'gold',
    label: 'Gold',
    bg: '#FEF9C3',
    accent: '#EAB308',
    text: '#713F12',
    muted: '#A16207',
    ctaBg: '#713F12',
    ctaText: '#FEF9C3',
  },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const DEFAULT_SLIDES = [
  {
    id: 's1',
    fields: [
      { id: 'f1', type: 'badge', value: 'Real Estate Tips' },
      { id: 'f2', type: 'title', value: '5 Secrets to Selling\nYour Home Faster' },
      { id: 'f3', type: 'subtitle', value: 'Swipe to learn what top agents never tell you' },
    ],
  },
  {
    id: 's2',
    fields: [
      { id: 'f1', type: 'badge', value: '01' },
      { id: 'f2', type: 'title', value: 'Price It Right\nFrom Day One' },
      {
        id: 'f3',
        type: 'body',
        value:
          'Overpriced homes sit on the market. A competitive listing price creates urgency and multiple offers, driving the final sale price up.',
      },
    ],
  },
  {
    id: 's3',
    fields: [
      { id: 'f1', type: 'badge', value: '02' },
      { id: 'f2', type: 'title', value: 'Stage for\nMaximum Appeal' },
      {
        id: 'f3',
        type: 'body',
        value:
          'Staged homes sell 73% faster than non-staged properties. Declutter, depersonalize, and let buyers imagine their future life here.',
      },
    ],
  },
  {
    id: 's4',
    fields: [
      { id: 'f1', type: 'badge', value: '03' },
      { id: 'f2', type: 'title', value: 'Professional Photos\nAre Non-Negotiable' },
      {
        id: 'f3',
        type: 'body',
        value:
          '90% of buyers start online. High-quality photography and video tours are your first showing make it count.',
      },
    ],
  },
  {
    id: 's5',
    fields: [
      { id: 'f1', type: 'badge', value: 'Ready to Sell?' },
      { id: 'f2', type: 'title', value: 'Let\u2019s Get Your\nHome Sold' },
      {
        id: 'f3',
        type: 'subtitle',
        value: 'Book a free 30-min strategy call and get a custom market analysis.',
      },
      { id: 'f4', type: 'cta', value: 'DM me \u2018SELL\u2019 to get started' },
    ],
  },
];

const DEFAULT_BRANDING = {
  photo: null,
  showPhoto: true,
  name: 'Jane Doe',
  showAuthor: true,
  handle: 'Licensed Realtor',
  showHandle: true,
};

function makeSlide() {
  return {
    id: uid(),
    fields: [
      { id: uid(), type: 'badge', value: 'New' },
      { id: uid(), type: 'title', value: 'Your Slide Title' },
      { id: uid(), type: 'body', value: 'Add your content here. Keep it concise and impactful.' },
    ],
  };
}

// ── AuthorBar ─────────────────────────────────────────────────────────────────

function AuthorBar({ branding, palette }) {
  const { photo, showPhoto, name, showAuthor, handle, showHandle } = branding;
  if (!showPhoto && !showAuthor && !showHandle) return null;
  if (showAuthor && !name && showHandle && !handle && !showPhoto) return null;
  const initials = name
    ? name
        .trim()
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingTop: 14,
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.13)',
      }}
    >
      {showPhoto && (
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 100,
            overflow: 'hidden',
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.3)',
            background: photo ? 'transparent' : palette.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt="author"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }}
            />
          ) : (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: palette.text }}>
              {initials}
            </span>
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {showAuthor && name && (
          <span
            style={{ fontSize: '0.78rem', fontWeight: 600, color: palette.text, lineHeight: 1.2 }}
          >
            {name}
          </span>
        )}
        {showHandle && handle && (
          <span style={{ fontSize: '0.7rem', color: palette.muted, lineHeight: 1.2 }}>
            {handle}
          </span>
        )}
      </div>
    </div>
  );
}

// ── EditableField ─────────────────────────────────────────────────────────────

function EditableField({ field, palette, onChange, onRemove }) {
  const [editing, setEditing] = useState(false);
  const styleMap = {
    badge: {
      display: 'inline-block',
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      backgroundColor: 'rgba(255,255,255,0.18)',
      color: palette.text,
      borderRadius: '999px',
      padding: '3px 12px',
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: 800,
      lineHeight: 1.2,
      color: palette.text,
      whiteSpace: 'pre-line',
    },
    subtitle: { fontSize: '0.84rem', lineHeight: 1.6, color: palette.muted },
    body: { fontSize: '0.82rem', lineHeight: 1.65, color: palette.muted },
    cta: {
      display: 'inline-block',
      fontSize: '0.8rem',
      fontWeight: 700,
      backgroundColor: palette.ctaBg,
      color: palette.ctaText,
      borderRadius: '999px',
      padding: '6px 16px',
      marginBottom: '10px',
    },
  };
  const inp = {
    width: '100%',
    padding: '6px 8px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.12)',
    color: 'orange',
    fontSize: '0.82rem',
    outline: 'none',
    fontFamily: 'inherit',
  };
  if (editing) {
    return ['title', 'body', 'subtitle'].includes(field.type) ? (
      <textarea
        autoFocus
        value={field.value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        style={{ ...inp, resize: 'vertical', minHeight: 60 }}
      />
    ) : (
      <input
        autoFocus
        value={field.value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        // style={inp}
      />
    );
  }
  return (
    <div style={{ position: 'relative' }} className="field-wrap" onClick={() => setEditing(true)}>
      <div style={{ ...styleMap[field.type], cursor: 'text' }}>{field.value}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="remove-btn"
        style={{
          position: 'absolute',
          top: -4,
          right: -4,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#ef4444',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.15s',
        }}
      >
        ✕
      </button>
    </div>
  );
}

// ── SlideCard ─────────────────────────────────────────────────────────────────

function SlideCard({
  slide,
  index,
  total,
  palette,
  branding,
  onUpdate,
  onRemove,
  onMoveLeft,
  onMoveRight,
}) {
  const upd = (id, val) =>
    onUpdate({
      ...slide,
      fields: slide.fields.map((f) => (f.id === id ? { ...f, value: val } : f)),
    });
  const del = (id) => onUpdate({ ...slide, fields: slide.fields.filter((f) => f.id !== id) });
  const add = (type) =>
    onUpdate({
      ...slide,
      fields: [...slide.fields, { id: uid(), type, value: 'New text element' }],
    });

  return (
    <div style={{ flexShrink: 0, width: 340, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#888' }}>
          Slide {index + 1}/{total}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { l: '\u2190', a: onMoveLeft, d: index === 0, title: 'Move left' },
            { l: '\u2192', a: onMoveRight, d: index === total - 1, title: 'Move right' },
            { l: '🗑️', a: onRemove, d: total <= 1, c: '#ef4444', title: 'Remove' },
          ].map((b) => (
            <button
              key={b.l}
              onClick={b.a}
              disabled={b.d}
              title={b.title}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                border: '1px solid #e2e8f0',
                background: '#fff',
                cursor: b.d ? 'not-allowed' : 'pointer',
                opacity: b.d ? 0.35 : 1,
                fontSize: 12,
                color: b.c || '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>
      <div
        data-slide-canvas
        style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          backgroundColor: palette.bg,
          minHeight: 420,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: palette.text,
            opacity: 0.07,
            transform: 'translate(40%,-40%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 140,
            height: 140,
            borderRadius: '50%',
            backgroundColor: palette.text,
            opacity: 0.07,
            transform: 'translate(-30%,30%)',
          }}
        />
        {/* <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 3,
            width: '100%',
            backgroundColor: palette.accent,
          }}
        /> */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 420,
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {slide.fields
              .filter((f) => f.type !== 'cta')
              .map((f) => (
                <EditableField
                  key={f.id}
                  field={f}
                  palette={palette}
                  onChange={(v) => upd(f.id, v)}
                  onRemove={() => del(f.id)}
                />
              ))}
          </div>
          {slide.fields
            .filter((f) => f.type === 'cta')
            .map((f) => (
              <div key={f.id} style={{ paddingTop: 10 }}>
                <EditableField
                  field={f}
                  palette={palette}
                  onChange={(v) => upd(f.id, v)}
                  onRemove={() => del(f.id)}
                />
              </div>
            ))}
          <AuthorBar branding={branding} palette={palette} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: '0 4px',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.72rem', color: '#888' }}>Add:</span>
        {['badge', 'subtitle', 'body', 'cta'].map((t) => (
          <Button
            key={t}
            onClick={() => add(t)}
            variant={'outline'}
            style={{
              fontSize: '0.72rem',
              padding: '2px 10px',
              borderRadius: 999,
              cursor: 'pointer',
            }}
          >
            ➕{t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────

function Toggle({ on, onChange, label }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          position: 'relative',
          background: on ? '#6366f1' : '#d1d5db',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: on ? 21 : 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'white' }}>{label}</span>
    </div>
  );
}

// ── BrandingPanel ─────────────────────────────────────────────────────────────

// Assumes a `Toggle` component exists in your codebase.
function BrandingPanel({ branding, onChange }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange({ ...branding, photo: ev.target.result });
    reader.readAsDataURL(file);
  };

  const initials = branding.name
    ? branding.name
        .trim()
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div className="rounded-2xl bg-card p-5 flex flex-col gap-4">
      <span className="text-sm font-semibold text-foreground">Branding</span>

      {/* Headshot */}
      <div className="flex flex-col gap-3">
        <Toggle
          on={branding.showPhoto}
          onChange={(v) => onChange({ ...branding, showPhoto: v })}
          label="Headshot"
        />
        {branding.showPhoto && (
          <div className="flex items-center gap-3">
            <div className="w-[58px] h-[58px] rounded-full overflow-hidden shrink-0 border-2 border-border bg-muted flex items-center justify-center">
              {branding.photo ? (
                <img src={branding.photo} alt="headshot" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl leading-none">😄</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
              <button
                onClick={() => fileRef.current.click()}
                className="py-1.5 px-3.5 rounded border border-input bg-background cursor-pointer text-xs font-medium text-muted-foreground"
              >
                {branding.photo ? 'Change photo' : 'Select image'}
              </button>
              {branding.photo && (
                <button
                  onClick={() => onChange({ ...branding, photo: null })}
                  className="w-8 h-8 rounded border border-destructive/20 bg-destructive/10 cursor-pointer text-destructive flex items-center justify-center text-sm"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Author name */}
      <div className="flex flex-col gap-2.5">
        <Toggle
          on={branding.showAuthor}
          onChange={(v) => onChange({ ...branding, showAuthor: v })}
          label="Author"
        />
        {branding.showAuthor && (
          <input
            value={branding.name}
            onChange={(e) => onChange({ ...branding, name: e.target.value })}
            placeholder="Your name"
            className="px-3 py-2 rounded border border-border text-sm outline-none text-foreground w-full box-border"
          />
        )}
      </div>

      {/* Handle */}
      <div className="flex flex-col gap-2.5">
        <Toggle
          on={branding.showHandle}
          onChange={(v) => onChange({ ...branding, showHandle: v })}
          label="Handle / Company"
        />
        {branding.showHandle && (
          <input
            value={branding.handle}
            onChange={(e) => onChange({ ...branding, handle: e.target.value })}
            placeholder="e.g. Licensed Realtor at Coldwell Banker"
            className="px-3 py-2 rounded border border-border text-sm outline-none text-foreground w-full box-border"
          />
        )}
      </div>
    </div>
  );
}

// ── PalettePicker ─────────────────────────────────────────────────────────────

function PalettePicker({ selected, onSelect }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Colour Palette</span>
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: selected.bg, color: selected.text }}
        >
          {selected.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {PALETTES.map((p) => {
          const active = p.id === selected.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              title={p.label}
              className="relative w-14 h-8 rounded-lg overflow-hidden border-0 cursor-pointer outline-offset-2 transition-transform duration-150"
              style={{
                outline: active ? `2.5px solid ${p.accent}` : '2.5px solid transparent',
                transform: active ? 'scale(1.1)' : 'scale(1)',
                boxShadow: active ? `0 0 0 3px ${p.accent}25` : '0 1px 3px rgba(0,0,0,0.12)',
              }}
            >
              <span className="absolute inset-0 right-1/2" style={{ backgroundColor: p.bg }} />
              <span className="absolute inset-0 left-1/2" style={{ backgroundColor: p.accent }} />
              {active && (
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    color: p.text,
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                  }}
                >
                  {p.id}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function LinkedInCarouselGenerator() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [palette, setPalette] = useState(PALETTES[6]);
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [downloading, setDownloading] = useState(false);
  const scrollRef = useRef(null);

  const updateSlide = useCallback(
    (i, u) => setSlides((p) => p.map((s, idx) => (idx === i ? u : s))),
    [],
  );
  const removeSlide = useCallback((i) => setSlides((p) => p.filter((_, idx) => idx !== i)), []);

  const addSlide = () => {
    setSlides((p) => [...p, makeSlide()]);
    setTimeout(
      () =>
        scrollRef.current?.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' }),
      50,
    );
  };

  const moveSlide = (from, to) => {
    if (to < 0 || to >= slides.length) return;
    setSlides((p) => {
      const n = [...p];
      const [x] = n.splice(from, 1);
      n.splice(to, 0, x);
      return n;
    });
  };

  const downloadCarousel = async () => {
    setDownloading(true);
    try {
      const elements = document.querySelectorAll('[data-slide-canvas]');
      if (!elements.length) return;

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [340, 420], // Matches the slice card dimensions
      });

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        // Use a high pixel ratio for crisp text/images
        const dataUrl = await toPng(el, {
          pixelRatio: 4,
          quality: 1,
          cacheBust: true,
          // Ensure styles are captured correctly
          style: {
            borderRadius: '0', // PDF pages don't need the card border radius
          },
        });

        if (i > 0) pdf.addPage([340, 420], 'p');

        pdf.addImage(dataUrl, 'PNG', 0, 0, 340, 420, undefined, 'FAST');
      }

      pdf.save(`linkedin-carousel-${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF Generation Error:', e);
      alert('PDF Generation Failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <style>{`.field-wrap:hover .remove-btn { opacity:1!important; } ::-webkit-scrollbar{height:6px;} ::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px;}`}</style>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <p className="text-muted-foreground/50 text-sm">Click any text to edit</p>
          <Button
            onClick={downloadCarousel}
            disabled={downloading}
            variant="outline"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              cursor: downloading ? 'not-allowed' : 'pointer',
              opacity: downloading ? 0.7 : 1,
            }}
          >
            {downloading ? 'Generating PDF' : 'Download PDF'}
          </Button>
        </div>

        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            paddingBottom: 12,
            scrollSnapType: 'x mandatory',
          }}
        >
          {slides.map((slide, i) => (
            <div key={slide.id} style={{ scrollSnapAlign: 'start' }}>
              <SlideCard
                slide={slide}
                index={i}
                total={slides.length}
                palette={palette}
                branding={branding}
                onUpdate={(u) => updateSlide(i, u)}
                onRemove={() => removeSlide(i)}
                onMoveLeft={() => moveSlide(i, i - 1)}
                onMoveRight={() => moveSlide(i, i + 1)}
              />
            </div>
          ))}
          <div
            style={{
              flexShrink: 0,
              width: 340,
              scrollSnapAlign: 'start',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              onClick={addSlide}
              style={{
                width: '100%',
                minHeight: 420,
                borderRadius: 20,
                border: '2px dashed #d1d5db',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                color: '#9ca3af',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.color = '#6366f1';
                e.currentTarget.style.background = '#f5f3ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '2px solid currentColor',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                +
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Add Slide</span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}
        >
          <BrandingPanel branding={branding} onChange={setBranding} />
          <PalettePicker selected={palette} onSelect={setPalette} />
        </div>
      </div>
    </>
  );
}
