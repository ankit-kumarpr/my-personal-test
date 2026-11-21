import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { dummyTemplates, templateCategories } from '../../data/dummyTemplates'
import TemplateCard from '../../components/templates/TemplateCard'
import SectionHeading from '../../components/common/SectionHeading'
import { cn } from '../../utils/format'

export default function TemplatesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return dummyTemplates.filter((t) => {
      const matchesCategory = category === 'All' || t.category === category
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <SectionHeading
        eyebrow="Template marketplace"
        title="Explore invitation designs"
        subtitle="Filter by mood and ceremony style. Every template has its own visual language."
      />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="w-full rounded-sm border border-champagne bg-ivory py-2.5 pl-10 pr-3 text-sm outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
          />
        </div>
        <p className="text-sm text-brown/60">{filtered.length} designs</p>
      </div>

      <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
        {['All', ...templateCategories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              'whitespace-nowrap rounded-sm px-3 py-2 text-xs uppercase tracking-[0.14em] transition',
              category === cat ? 'bg-olive text-ivory' : 'bg-beige text-brown hover:bg-champagne/40',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-serif text-lg text-brown/70">No templates match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}
