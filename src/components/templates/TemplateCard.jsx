import { Link } from 'react-router-dom'
import { colorThemes } from '../../data/dummyTemplates'
import Button from '../common/Button'
import Badge from '../common/Badge'

export default function TemplateCard({ template }) {
  const theme = colorThemes[template.colorTheme]

  return (
    <article className="group overflow-hidden rounded-sm border border-champagne/70 bg-ivory shadow-[0_20px_50px_rgba(68,56,47,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(68,56,47,0.1)]">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={template.previewImage}
          alt={template.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge>{template.category}</Badge>
          <h3 className="mt-2 font-display text-2xl text-ivory">{template.name}</h3>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="font-serif text-brown/75 leading-relaxed">{template.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.16em] text-sage">Palette</span>
          <div className="flex gap-1.5">
            {[theme.primary, theme.secondary, theme.accent, theme.background].map((c) => (
              <span
                key={c}
                className="h-4 w-4 rounded-full border border-brown/10"
                style={{ background: c }}
                title={c}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1" to={`/templates/${template.id}`}>
            Preview
          </Button>
          <Button size="sm" className="flex-1" to={`/create?template=${template.id}`}>
            Customize
          </Button>
        </div>
        <Link to={`/invite/ananya-aarav-jaipur`} className="block text-center text-xs text-sage hover:text-olive">
          See live invitation demo →
        </Link>
      </div>
    </article>
  )
}
