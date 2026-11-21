import { Link, useParams } from 'react-router-dom'
import { dummyTemplates, colorThemes } from '../../data/dummyTemplates'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import FloralDivider from '../../components/common/FloralDivider'

export default function TemplateDetailsPage() {
  const { id } = useParams()
  const template = dummyTemplates.find((t) => t.id === id)

  if (!template) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-olive">Template not found</h1>
        <Button className="mt-6" to="/templates">Back to templates</Button>
      </div>
    )
  }

  const theme = colorThemes[template.colorTheme]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <Link to="/templates" className="text-sm text-sage hover:text-olive">← All templates</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-sm border border-champagne/70">
          <img src={template.previewImage} alt={template.name} className="aspect-[3/4] w-full object-cover" />
        </div>
        <div>
          <Badge>{template.category}</Badge>
          <h1 className="mt-4 font-display text-4xl text-olive md:text-5xl">{template.name}</h1>
          <FloralDivider className="my-6 justify-start" />
          <p className="font-serif text-xl leading-relaxed text-brown/80">{template.description}</p>

          <div className="mt-8 space-y-4 text-sm">
            <p><span className="uppercase tracking-[0.16em] text-sage">Layout</span> · {template.layout}</p>
            <p><span className="uppercase tracking-[0.16em] text-sage">Florals</span> · {template.floral}</p>
            <p><span className="uppercase tracking-[0.16em] text-sage">Animation</span> · {template.animation}</p>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-sage">Color theme · {theme.name}</p>
            <div className="mt-3 flex gap-2">
              {[theme.primary, theme.secondary, theme.accent, theme.background].map((c) => (
                <div key={c} className="h-10 w-10 rounded-sm border border-brown/10" style={{ background: c }} title={c} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={`/create?template=${template.id}`}>Customize this design</Button>
            <Button variant="secondary" to="/invite/ananya-aarav-jaipur">View live invitation demo</Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {template.gallery.map((src) => (
              <img key={src} src={src} alt="" className="aspect-[3/4] rounded-sm object-cover" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
