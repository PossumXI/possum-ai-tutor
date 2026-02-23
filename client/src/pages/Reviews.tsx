/*
 * REDLINE TERMINAL — Reviews Page
 * Clients submit reviews; approved ones display in a terminal card grid
 * Admin (PossumXI) can approve/delete from the same page when logged in
 */
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STAR_LABELS = ['', 'POOR', 'FAIR', 'GOOD', 'GREAT', 'LEGEND'];

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '0.4rem' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.6rem',
            color: star <= (hovered || value) ? '#DC143C' : '#333',
            transition: 'color 0.15s ease',
            padding: '0 0.1rem',
            lineHeight: 1,
            textShadow: star <= (hovered || value) ? '0 0 10px rgba(220,20,60,0.6)' : 'none',
          }}
        >
          ★
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: '#DC143C',
          alignSelf: 'center',
          marginLeft: '0.5rem',
          letterSpacing: '0.1em',
        }}>
          {STAR_LABELS[hovered || value]}
        </span>
      )}
    </div>
  );
}

function ReviewCard({ review, isAdmin, onApprove, onDelete }: {
  review: {
    id: number;
    name: string;
    handle: string | null;
    rating: number;
    title: string;
    body: string;
    approved: boolean;
    createdAt: Date;
  };
  isAdmin: boolean;
  onApprove?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(220,20,60,0.2)',
        borderLeft: '3px solid #DC143C',
        padding: '1.5rem',
        position: 'relative',
        opacity: review.approved ? 1 : 0.65,
        transition: 'all 0.3s ease',
      }}
      className="box-glow-hover"
    >
      {/* Pending badge for admin */}
      {isAdmin && !review.approved && (
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: 'rgba(220,20,60,0.15)',
          border: '1px solid rgba(220,20,60,0.4)',
          padding: '0.15rem 0.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: '#DC143C',
          letterSpacing: '0.1em',
        }}>
          PENDING
        </div>
      )}

      {/* Stars */}
      <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
        {[1, 2, 3, 4, 5].map(s => (
          <span key={s} style={{
            color: s <= review.rating ? '#DC143C' : '#222',
            fontSize: '1rem',
            textShadow: s <= review.rating ? '0 0 8px rgba(220,20,60,0.5)' : 'none',
          }}>★</span>
        ))}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.95rem',
        fontWeight: 700,
        color: '#E8E8E8',
        marginBottom: '0.75rem',
        letterSpacing: '0.03em',
      }}>
        "{review.title}"
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.9rem',
        color: '#888',
        lineHeight: 1.7,
        marginBottom: '1.25rem',
      }}>
        {review.body}
      </p>

      {/* Author */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '0.75rem',
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: '#DC143C',
            letterSpacing: '0.05em',
          }}>
            {review.name}
          </div>
          {review.handle && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#444',
              letterSpacing: '0.05em',
            }}>
              {review.handle}
            </div>
          )}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: '#333',
          letterSpacing: '0.1em',
        }}>
          {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Admin controls */}
      {isAdmin && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {!review.approved && (
            <button
              onClick={onApprove}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                padding: '0.35rem 0.8rem',
                background: 'rgba(0,200,100,0.1)',
                border: '1px solid rgba(0,200,100,0.3)',
                color: '#00C864',
                letterSpacing: '0.1em',
              }}
            >
              APPROVE
            </button>
          )}
          <button
            onClick={onDelete}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              padding: '0.35rem 0.8rem',
              background: 'rgba(220,20,60,0.08)',
              border: '1px solid rgba(220,20,60,0.3)',
              color: '#DC143C',
              letterSpacing: '0.1em',
            }}
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}

export default function Reviews() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Fetch reviews
  const { data: publicReviews, refetch: refetchPublic } = trpc.reviews.list.useQuery();
  const { data: adminReviews, refetch: refetchAdmin } = trpc.reviews.adminList.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  const reviews = isAdmin ? (adminReviews ?? []) : (publicReviews ?? []);

  // Mutations
  const approveMut = trpc.reviews.approve.useMutation({
    onSuccess: () => { refetchAdmin(); refetchPublic(); },
  });
  const deleteMut = trpc.reviews.delete.useMutation({
    onSuccess: () => { refetchAdmin(); refetchPublic(); },
  });
  const submitMut = trpc.reviews.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: '', handle: '', rating: 0, title: '', body: '' });
    },
  });

  // Form state
  const [form, setForm] = useState({ name: '', handle: '', rating: 0, title: '', body: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name required (min 2 chars)';
    if (form.rating === 0) e.rating = 'Please select a rating';
    if (!form.title.trim() || form.title.length < 3) e.title = 'Title required (min 3 chars)';
    if (!form.body.trim() || form.body.length < 10) e.body = 'Review required (min 10 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitMut.mutate({
      name: form.name,
      handle: form.handle || undefined,
      rating: form.rating,
      title: form.title,
      body: form.body,
    });
  };

  const inputStyle = {
    width: '100%',
    background: '#0a0a0a',
    border: '1px solid rgba(220,20,60,0.25)',
    borderRadius: 0,
    padding: '0.75rem 1rem',
    color: '#E8E8E8',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <>
      <CustomCursor />
      <div style={{ background: '#050505', minHeight: '100vh' }}>
        <Navbar />

        {/* Hero */}
        <div style={{
          paddingTop: '8rem',
          paddingBottom: '4rem',
          paddingLeft: '3rem',
          paddingRight: '3rem',
          borderBottom: '1px solid rgba(220,20,60,0.1)',
          position: 'relative',
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#DC143C',
              letterSpacing: '0.2em',
              marginBottom: '0.75rem',
            }}>
              // FIELD REPORTS
            </div>
            <h1 style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#E8E8E8',
              marginBottom: '1rem',
            }}>
              CLIENT REVIEWS
              <span style={{ color: '#DC143C' }}>.</span>
            </h1>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              color: '#666',
              maxWidth: 560,
              lineHeight: 1.7,
            }}>
              Honest feedback from past and current clients. Had a session with PossumXI?
              Drop your review below — it goes live after a quick review.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 3rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '4rem',
            alignItems: 'start',
          }}>

            {/* LEFT — Submission Form */}
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: '#DC143C',
                letterSpacing: '0.2em',
                marginBottom: '1.5rem',
              }}>
                // SUBMIT YOUR REVIEW
              </div>

              {submitted ? (
                <div style={{
                  background: 'rgba(220,20,60,0.05)',
                  border: '1px solid rgba(220,20,60,0.3)',
                  borderLeft: '3px solid #DC143C',
                  padding: '2rem',
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1rem',
                    color: '#DC143C',
                    marginBottom: '0.75rem',
                    fontWeight: 700,
                  }}>
                    REVIEW RECEIVED
                  </div>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.9rem',
                    color: '#888',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}>
                    Thanks for the feedback. Your review will appear here after approval.
                  </p>
                  <button
                    className="btn-outline-red"
                    onClick={() => setSubmitted(false)}
                    style={{ fontSize: '0.75rem', padding: '0.5rem 1.2rem' }}
                  >
                    SUBMIT ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#555',
                      letterSpacing: '0.15em',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}>
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? '#DC143C' : 'rgba(220,20,60,0.25)',
                      }}
                    />
                    {errors.name && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#DC143C', marginTop: '0.3rem' }}>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Handle */}
                  <div>
                    <label style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#555',
                      letterSpacing: '0.15em',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}>
                      DISCORD / GITHUB HANDLE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="@YourHandle"
                      value={form.handle}
                      onChange={e => setForm(f => ({ ...f, handle: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#555',
                      letterSpacing: '0.15em',
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}>
                      RATING *
                    </label>
                    <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                    {errors.rating && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#DC143C', marginTop: '0.3rem' }}>
                        {errors.rating}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#555',
                      letterSpacing: '0.15em',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}>
                      REVIEW TITLE *
                    </label>
                    <input
                      type="text"
                      placeholder="One line that sums it up"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      style={{
                        ...inputStyle,
                        borderColor: errors.title ? '#DC143C' : 'rgba(220,20,60,0.25)',
                      }}
                    />
                    {errors.title && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#DC143C', marginTop: '0.3rem' }}>
                        {errors.title}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div>
                    <label style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#555',
                      letterSpacing: '0.15em',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}>
                      YOUR REVIEW *
                    </label>
                    <textarea
                      placeholder="Tell others what you learned, what changed, what was different about working with PossumXI..."
                      value={form.body}
                      onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                      rows={6}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        borderColor: errors.body ? '#DC143C' : 'rgba(220,20,60,0.25)',
                      }}
                    />
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#333',
                      marginTop: '0.3rem',
                      textAlign: 'right',
                    }}>
                      {form.body.length}/2000
                    </div>
                    {errors.body && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#DC143C', marginTop: '0.3rem' }}>
                        {errors.body}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-red"
                    disabled={submitMut.isPending}
                    style={{ opacity: submitMut.isPending ? 0.7 : 1 }}
                  >
                    {submitMut.isPending ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                  </button>

                  {submitMut.isError && (
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: '#DC143C',
                      padding: '0.75rem',
                      border: '1px solid rgba(220,20,60,0.3)',
                      background: 'rgba(220,20,60,0.05)',
                    }}>
                      ERROR: {submitMut.error?.message ?? 'Submission failed. Try again.'}
                    </div>
                  )}

                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.62rem',
                    color: '#333',
                    lineHeight: 1.6,
                    letterSpacing: '0.05em',
                  }}>
                    Reviews are moderated before appearing publicly. No spam, no fake reviews.
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT — Reviews display */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#DC143C',
                  letterSpacing: '0.2em',
                }}>
                  // {isAdmin ? 'ALL REVIEWS (ADMIN VIEW)' : 'APPROVED REVIEWS'}
                </div>
                {reviews.length > 0 && (
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#444',
                    letterSpacing: '0.1em',
                  }}>
                    {reviews.length} TOTAL
                  </div>
                )}
              </div>

              {reviews.length === 0 ? (
                <div style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(220,20,60,0.1)',
                  borderLeft: '3px solid rgba(220,20,60,0.3)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    color: '#333',
                    letterSpacing: '0.1em',
                  }}>
                    NO REVIEWS YET
                  </div>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.85rem',
                    color: '#444',
                    marginTop: '0.75rem',
                  }}>
                    Be the first to leave a review.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {reviews.map(review => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isAdmin={isAdmin}
                      onApprove={() => approveMut.mutate({ id: review.id })}
                      onDelete={() => deleteMut.mutate({ id: review.id })}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
        input:focus, textarea:focus {
          border-color: rgba(220,20,60,0.6) !important;
          box-shadow: 0 0 0 1px rgba(220,20,60,0.2);
        }
      `}</style>
    </>
  );
}
