
import pathlib

NL = chr(10)
Q = chr(34)

def make_nav(href, px, icon, label):
    return (
        '        <a' + NL +
        '          href=' + Q + href + Q + NL +
        '          class=' + Q + 'sidebar-link flex items-center gap-3 rounded-lg ' + px + ' py-2.5 text-sm font-medium transition' + Q + NL +
        '        >' + NL +
        '          <!-- ' + label + ' -->' + NL +
        '          <svg class=' + Q + 'hi h-5 w-5' + Q + ' aria-hidden=' + Q + 'true' + Q + '>' + NL +
        '            <use href=' + Q + '#hi-' + icon + Q + ' />' + NL +
        '          </svg>' + NL +
        '' + NL +
        '          ' + label + NL +
        '        </a>' + NL +
        '' + NL
    )

def fix_nav(filepath, gallery_href, pricing_href):
    data = pathlib.Path(filepath).read_text(encoding='utf-8')
    
    # Find the Gallery <a ...>...</a> block
    gall_href_str = '          href=' + Q + gallery_href + Q
    gall_pos = data.find(gall_href_str)
    gall_start = data.rfind('        <a' + NL, 0, gall_pos)
    gall_end = data.find('        </a>' + NL, gall_pos) + len('        </a>' + NL)
    
    print(f'{filepath}: Gallery block at {gall_start}-{gall_end}')
    
    # Check if pricing is nested inside
    price_href_str = '          href=' + Q + pricing_href + Q
    price_pos = data.find(price_href_str, gall_start, gall_end)
    
    if price_pos != -1:
        # Pricing is nested - find its block
        price_start = data.rfind('        <a' + NL, gall_start, price_pos)
        price_end = data.find('        </a>' + NL, price_pos) + len('        </a>' + NL)
        print(f'{filepath}: Pricing nested at {price_start}-{price_end}')
        
        # Create proper sibling nav items
        pricing_nav = make_nav(pricing_href, 'px-3', 'banknotes', 'Pricing')
        gallery_nav = make_nav(gallery_href, 'px-4', 'photo', 'Gallery')
        
        # Replace from gallery_start to gallery_end with pricing + gallery
        data = data[:gall_start] + pricing_nav + gallery_nav + data[gall_end:]
        pathlib.Path(filepath).write_text(data, encoding='utf-8')
        print(f'{filepath}: FIXED - Pricing now sibling before Gallery')
    else:
        print(f'{filepath}: Pricing not nested, may already be correct')

fix_nav('index.html', '#gallery', './pricing/pricing.html')
fix_nav('projects/projects.html', '../index.html#gallery', '../pricing/pricing.html')
print('DONE')
