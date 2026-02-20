"use client"
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const PageNavigate = () => {
    const pathname = usePathname()
    // Generate breadcrumbs from pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    // Capitalize first letter of each segment
    const formatSegment = (segment: string) => {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }
    
    return (
        <div className={`w-full flex items-center justify-between mx-auto md:px-0 border-black/10 mt-0 ${pathname === "/home/category" ? "" : pathname === "/home/shop/men/t-shirts" ? "ml-0" : "md:ml-6"} px-6`}>
            <nav className="flex items-center gap-2 text-xs md:text-base text-black/60">
                {pathSegments.map((segment, index) => {
                    const href = segment === 'home' ? '/' : '/' + pathSegments.slice(0, index + 1).join('/')
                    const isLast = index === pathSegments.length - 1
                    
                    return (
                        <React.Fragment key={href}>
                            {index > 0 && <ChevronRight className="w-4 h-4" />}
                            {isLast ? (
                                <span className="text-black font-medium">
                                    {formatSegment(segment)}
                                </span>
                            ) : (
                                <Link href={href} className="hover:text-black transition-colors">
                                    {formatSegment(segment)}
                                </Link>
                            )}
                        </React.Fragment>
                    )
                })}
            </nav>
        </div>
    )
}

export default PageNavigate