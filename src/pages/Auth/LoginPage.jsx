import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useApp } from '../../context/AppContext'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function LoginPage() {
  const { login, user } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: 'ananya@velvetvow.demo', password: 'demo123' },
  })

  if (user) return <Navigate to="/dashboard" replace />

  const onSubmit = (data) => {
    const result = login(data.email, data.password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-sage">Welcome back</p>
      <h1 className="mt-3 font-display text-4xl text-olive">Sign in</h1>
      <p className="mt-3 font-serif text-brown/70">Demo account is prefilled. Password: demo123</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <Button type="submit" className="w-full">Enter the atelier</Button>
      </form>

      <p className="mt-6 text-center text-sm text-brown/70">
        New here? <Link to="/register" className="text-olive underline">Create an account</Link>
      </p>
    </div>
  )
}
