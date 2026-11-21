import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useApp } from '../../context/AppContext'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function RegisterPage() {
  const { register: registerUser, user } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (user) return <Navigate to="/dashboard" replace />

  const onSubmit = (data) => {
    const result = registerUser(data)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-sage">Join Velvet Vow</p>
      <h1 className="mt-3 font-display text-4xl text-olive">Create account</h1>
      <p className="mt-3 font-serif text-brown/70">Dummy registration — stored locally in your browser.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input label="Full Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
        <Input label="Phone" {...register('phone')} />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
        />
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <Button type="submit" className="w-full">Register</Button>
      </form>

      <p className="mt-6 text-center text-sm text-brown/70">
        Already have an account? <Link to="/login" className="text-olive underline">Sign in</Link>
      </p>
    </div>
  )
}
