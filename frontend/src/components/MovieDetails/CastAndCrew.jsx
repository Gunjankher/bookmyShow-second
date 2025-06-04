import React from 'react'

function CastAndCrew({
    poster,
    actor,
    character
}) {


    const profile = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAMFBMVEXk5ueutLfo6uu/xMepsLOxt7rX2tvh4+THy83b3t+5vsHDyMrU19m2u77Lz9HP0tTtfvmoAAAECElEQVR4nO2cXZOrIAxANSCKivz/f3tRa9vtJ5CY0Lmcp92ZfTjDBIIh2aapVCqVSqVSqVQqlUolEwCQVognyNp59t7Ptv8F8d561ekbTvlVXFrrHQBmGFut23vCr2owZUoDzGPXvkR3oy3R2XT6tfBuXZw0WPVJeJOeypL2H5f4CA9fkLP66rujSnHuI5b4stCul5bdMG/OiZd0JQR0knEJzmCThFfszxmHdRZV7l26cjuK7sEp9qy4Rw9y4Qw+xzg4z1LOOYF8QSo0YMxb5PW+IbPMMGcvctsZEees0+JYZiUSGj7fOGAEjPsRpTwKRIbJ3Xs7mj8y8o+Li7LA3RlnHA4N7mWGGavccqdAQJxwF7jTSY825r7QYTLfAXMGhAGvzHyfg9gywCflgdMYm/p2ZcWqbPEHRth/nMZg0yoBr2FNJpBYvHgN6zWD4oyrykzKnDWY/1e5nhgMyrwFGJLsx1vSp7hj8CbspqG4Fk2sxjARKHte5QWvzP29SnCVc8wPEIBX5r3hr8GMrmMs3OUii1Zmr30C1tix1+RgQZYRBZ54sGeGxMsDagNq9s3XYL+y2Uu1uzMmaS8Sxqjqp1QrSe57cMtfDr85Z76XSLyTHGR+nMjsvR3Ie66UeQ0+nHNK48Ltcuk3OpEk8pevnZMPxoItL3nOUp0YDwwJzvJRsRH97arlUsgj8Ll3+WrsxDsRb0DUYVfCxrsDzOf6kW6LaxNvoJlH/S48tFZzU5rxhnktHYSFW1PfAwB+dN1tTiP80HWlLvABQG/8MKlxRU2DNwUPwlxZh4z6nR+ZlIKPv5bDtrDWzFtMbNG80nZuVGrws7HbiktbXoE1fpdVdfd8Oi8CnQtxPdsitIPDPLgurOu33Bf+IIgvsrsxBIMZ3Nv88SaphKzSy0T4Ooc4dGm+1/VW3rJbA5jJfQ+G93TK95zS0CwUT5UTlzQ0dsiKhye2sD7fOkSEwgTEI6M/O6ihV9FjZ7HS535c9YkVgCi0O616BL2nDIl76ZNmRMOn0jnCq3M30CdFoHho/4SjPjsiP/sx6IW0hEvSGPDVWdEtNODey+KdyY4OsI7FeIWmq4QhjG+QFJ/BsPluzvgqGFFHHKMzTadkmjOusYs5Kg5nxDojhlNRzvl7EDBzkyjyn9nOuGpGkTvYAynPNrRol2eM79FCOOc9zMsJr2R8Xp19P/5GepMJe9Z7In3oS+y0uJL4vgLIkWUCUncgwWgq3jnps7uARW4T/8sRUEwH4EmJZpnr0BMJV2eKYVoKEsaeSaZGKIhOgfJp5EL8DDG2m5qO+MiQz3wHscrFhHKrY0cMJC/Kf4muEJSjHJ0A89uSyYmc5CAYzCFDRyovqhii/1UQlEOkceH8A63tN3YNzOOZAAAAAElFTkSuQmCC'

    const imageSrc = poster ? poster : profile;
  return (
    <div>

<div className='flex flex-col justify-center items-start'>
<img 
className='w-[85px] h-[85px]  border rounded-[50px] border-black text-black '
src={poster}
 alt="" />
<div className='text-black '>{actor}</div>
<div className='text-black'>as {character} </div>
</div>



    </div>
  )
}

export default CastAndCrew